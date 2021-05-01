const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderList=new Schema(
    {
        index:Number,
        productName:String,
        productUnit:String,
        unitPrice:mongoose.Decimal128,
        orderCount:Number,
        totalPrice:mongoose.Decimal128,
    }
)

const orderStats=new Schema(
    {
        net:Number, 
        tax:Number, 
        total:Number, 
        discount:Number
    }
)

const orderSchema = new Schema(
  {
    userCompanyId: String,
    customerId:String,
    orderList:[orderList],
    orderStats:orderStats,
    note:String,
    prePayment:mongoose.Decimal128,
    orderStatus:{ type: Number, default: 0 },
    deliveryDate:Date,
    urgent: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedById: String,
    createdById:String,
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
    toJSON: { virtuals: true },
  }
);

orderSchema.virtual("customer", {
    ref: "customers",
    localField: "customerId",
    foreignField: "_id",
    justOne: true,
});


orderSchema.statics.getOrders=function(userCompanyId){
    return this.find(
        {userCompanyId: userCompanyId, isDeleted: false },
        {
            isDeleted:0,
            userCompanyId:0,
            updatedDate:0,
            note:0,
            orderStats:0,
        }
    )
    .populate([
        { path: "customer", select: "fullName ownerName tel1 -_id" },
]).lean();
}

orderSchema.statics.getOrder=function(orderId){
    return this.findOne({_id: orderId},)
    .populate([{ path: "customer", select: "fullName ownerName tel1 -_id" },]).lean();
}

orderSchema.statics.setOrder=function(order){
    return new Promise((resolve,reject)=>{
        if(order._id  && order._id!==""){
            this.findById(order._id, (err, res) => {
                if (err) reject({ message: err.message });
                else {
                  res.set(order);
                  res.save((saveErr, uptOrder) => {saveErr ? reject({ message: saveErr.message }) : resolve(uptOrder)});
                }
            });
        }
        else{
            let newOrder = new orderModel(order);
            newOrder.save((saveErr, uptOrder) => {
                saveErr ? reject({ message: saveErr.message }) : resolve(uptOrder);
            });
        }
    })
}

orderSchema.statics.deleteOrder = function (orderId) {
    return this.findOneAndUpdate({ _id: orderId },{ isDeleted: true },{ fields: { _id: 1 }, new: true }).lean();
};


 const orderModel = mongoose.model("orders", orderSchema);
 module.exports=orderModel;

