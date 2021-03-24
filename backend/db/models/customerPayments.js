const mongoose = require("mongoose");
const { Schema } = mongoose;
const PaymentType={
  INCOME:1, // Gelir - Tahsilat
  EXPENSE:2, // Gider - Ödeme
}

const paymentHistorySchema = new Schema(
  {
    description: String,
    payment: mongoose.Decimal128,
    isDeleted: { type: Boolean, default: false },
    deletedById: String,
    deletedDate: Date,
    createdById: String,
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
    toJSON: { virtuals: true },
  }
);

const customerPaymentSchema = new Schema(
  {
    customerId: String,
    jobId: String,
    title: String,
    paymentType:Number,
    description: String,
    initialBalance: mongoose.Decimal128,
    lastPaymentDate:Date,
    isClosed: { type: Boolean, default: false },
    paymentHistory: [paymentHistorySchema],
    isDeleted: { type: Boolean, default: false },
    deletedById: String,
    deletedDate: Date,
    createdById: String,
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
    toJSON: { virtuals: true },
  }
);

customerPaymentSchema.statics.getPaymentById = function (_id) {
  return new Promise((resolve,reject)=>{
     this.aggregate([
       { $match:{
          _id:mongoose.Types.ObjectId(_id),
          isDeleted:false,
       } },
       {
         $facet:{
          info:[
            {$project:{
              _id:1,
              jobId:1,
              customerId:1,
              paymentType:1,
              title:1,
              description:1,
              initialBalance:1,
              createdDate:1,
              lastPaymentDate:1,
              isClosed:1
            }}
          ],
          totalSubPayments:[
            {$unwind:"$paymentHistory"},
            {$match:{"paymentHistory.isDeleted":false}},
            {$group:{_id:"$_id", total:{$sum: "$paymentHistory.payment"}}},
            {$project:{_id:0}}
          ],
           subPayments:[
            {
              $unwind: '$paymentHistory'
            },
            {
              $match: {"paymentHistory.isDeleted": false }
            },
            {
              $set: {
                "paymentHistory.payment":{"$toString" : "$paymentHistory.payment"},
              }
            },
            {
              $replaceRoot: { newRoot: "$paymentHistory" }
            }
           ]
         }
       },
       { $unwind: '$info' },
       {
         $set: {
          "info.activeBalance":{"$toString":{$subtract:["$info.initialBalance", { $ifNull: [{$first:"$totalSubPayments.total"}, 0 ] }]}},
          "info.totalSubPayments":{"$toString":{ $ifNull: [{$first:"$totalSubPayments.total"},0]}},
          "info.initialBalance":{"$toString":"$info.initialBalance"}
        }
       },
       {
         $unset:"totalSubPayments"
       }
      ])
      .then((queryRes)=>{resolve(queryRes)})
      .catch((queryErr)=>{reject(queryErr)})
  })
};

customerPaymentSchema.statics.getPaymentByJobId = function (jobId) {
  return new Promise((resolve,reject)=>{
    this.aggregate([
      { $match:{
         jobId:jobId,
         isDeleted:false,
      } },
      {
        $facet:{
         info:[
           {$project:{
             _id:1,
             jobId:1,
             customerId:1,
             paymentType:1,
             title:1,
             description:1,
             initialBalance:1,
             createdDate:1,
             isClosed:1,
             lastPaymentDate:1
           }}
         ],
         totalSubPayments:[
           {$unwind:"$paymentHistory"},
           {$match:{"paymentHistory.isDeleted":false}},
           {$group:{_id:"$_id", total:{$sum: "$paymentHistory.payment"}}},
           {$project:{_id:0}}
         ],
          subPayments:[
           {
             $unwind: '$paymentHistory'
           },
           {
             $match: {"paymentHistory.isDeleted": false }
           },
           {
             $replaceRoot: { newRoot: "$paymentHistory" }
           }
          ]
        }
      },
      {
        $set:{
          "info.activeBalance":{$subtract:[ { $first: "$info.initialBalance" },{ $ifNull: [{ $first: "$totalSubPayments.total" }, 0 ] }]}
        }
      }
     ])
     .then((queryRes)=>{resolve(queryRes)})
     .catch((queryErr)=>{reject(queryErr)})
 })
};

customerPaymentSchema.statics.getPaymentsForCustomer = function (customerId) {
return new Promise((resolve,reject)=>{
  this.aggregate([
    { $match:{
      customerId:customerId,
      isDeleted:false,
   } },
   {
     $project:{
       _id:1,
       title:1,
       description:1,
       createdDate:1,
       initialBalance:1,
       paymentType:1,
       lastPaymentDate:1,
       totalPayments: {
        $reduce: {
          input: "$paymentHistory",
          initialValue: 0,
          in: { 
              $cond: { 
                if: { $eq: [ "$$this.isDeleted", false ] }, 
                then: {$add : ["$$value", "$$this.payment"]}, 
                else: {$add : ["$$value", 0]} 
              }
          }}
       }
     }
   },
   {
     $set:{
       activeBalance:{$toString:{$subtract:["$initialBalance","$totalPayments"]}},
       initialBalance: {"$toString" : "$initialBalance"},
       totalPayments: {"$toString" : "$totalPayments"},
     }
   }
  ])
  .then((queryRes)=>{resolve(queryRes)})
  .catch((queryErr)=>{reject(queryErr)})
})

};

customerPaymentSchema.statics.setPayment = function (payment) {
  return new Promise((resolve, reject) => {
    if (payment._id && payment._id !== "") {
      this.findById(payment._id, (err, res) => {
        if (err) reject({ message: err.message });
        else {
          res.set(payment);
          res.save((saveErr, saved) => {
            if (saveErr) reject({ message: saveErr.message });
            else resolve(saved);
          });
        }
      });
    } else {
      let newPayment = new customerPaymentModel(payment);
      newPayment.save((saveErr, saved) => {
        if (saveErr) reject({ message: saveErr.message });
        else resolve(saved);
      });
    }
  });
};

customerPaymentSchema.statics.setsubPayment = function (subPayment) {
  let parentId = subPayment.parentId;
  delete subPayment["parentId"];
  if (subPayment._id && subPayment._id !== "") {
    return this.findOneAndUpdate(
      { _id: parentId, "paymentHistory._id": subPayment._id },
      {
        $set: {
          "paymentHistory.$.payment": subPayment.payment,
          "paymentHistory.$.description": subPayment.description,
        },
      }
    ).lean();
  } else {
    return this.findOneAndUpdate(
      { _id: parentId },
      {
        $push: { paymentHistory: subPayment },
      }
    ).lean();
  }
};

customerPaymentSchema.statics.deletePayment = function (paymentId) {
  if (paymentId && paymentId !== "") {
    return this.findOneAndUpdate(
      { _id: paymentId },
      { isDeleted: true, deletedDate: new Date() }
    ).lean();
  } 
};


customerPaymentSchema.statics.deleteSubPayment = function (paymentId) {
if (paymentId && paymentId !== "") {
    return this.findOneAndUpdate(
      { "paymentHistory._id": paymentId },
      {
        "paymentHistory.$.isDeleted": true,
        "paymentHistory.$.deletedDate": new Date(),
      }
    ).lean();
  }
};


const customerPaymentModel = mongoose.model(
  "customers_payments",
  customerPaymentSchema
);
module.exports = customerPaymentModel;
