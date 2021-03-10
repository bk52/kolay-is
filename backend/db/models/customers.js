const mongoose = require("mongoose");
const { citiesModel, townsModel } = require("./cities");
const { Schema } = mongoose;

const contactsSchema = new Schema({});

const customerSchema = new Schema(
  {
    userCompanyId: String,
    fullName: { type: String, required: [true, "fullname is required"] },
    ownerName: String,
    taxAdress: String,
    taxNo: String,
    tel1: String,
    tel2: String,
    fax: String,
    mail: String,
    adress: String,
    townID: Number,
    cityID: Number,
    rate: Number,
    notes: String,
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

// "jobs": [],
// "contacts": []
customerSchema.index({ fullName: "text" });
customerSchema.index({ ownerName: "text" });

customerSchema.virtual("cityName", {
  ref: "sys_cities",
  localField: "cityID",
  foreignField: "code",
  justOne: true,
});

customerSchema.virtual("townName", {
  ref: "sys_towns",
  localField: "townID",
  foreignField: "townCode",
  justOne: true,
});

customerSchema.statics.getCustomer = function (customerId) {
  return this.findOne({ _id: customerId, isDeleted: false })
  .populate([
    { path: "cityName", select: "name -_id -code" },
    { path: "townName", select: "name -_id -townCode" },
  ]).lean();
};

customerSchema.statics.deleteCustomer = function (customerId) {
  return this.findOneAndUpdate(
    { _id: customerId },
    { isDeleted: true },
    { fields: { _id: 1 }, new: true }
  ).lean();
};

customerSchema.statics.setCustomer = function (customer) {
  return new Promise((resolve, reject) => {
    if (customer._id && customer._id !== "") {
      this.findById(customer._id, (err, res) => {
        if (err) reject({ message: err.message });
        else {
          res.set(customer);
          res.save((saveErr, uptCustomer) => {
            if (saveErr) {
              reject({ message: saveErr.message });
            } else {
              resolve(uptCustomer);
            }
          });
        }
      });
    } else {
      let newCustomer = new customerModel(customer);
      newCustomer.save((saveErr, uptCustomer) => {
        if (saveErr) {
          reject({ message: saveErr.message });
        } else {
          resolve(uptCustomer);
        }
      });
    }
  });
};

customerSchema.statics.getCompanyCustomers = function (companyId) {
  return this.find(
    { userCompanyId: companyId, isDeleted: false },
    "fullName ownerName tel1 tel2 adress cityID townID rate"
  )
    .populate([
      { path: "cityName", select: "name -_id -code" },
      { path: "townName", select: "name -_id -townCode" },
    ])
    .lean();
};

customerSchema.statics.getCompanyCustomersDetails = function (companyId) {
  return this.find({ userCompanyId: companyId, isDeleted: false }).lean();
};

customerSchema.statics.searchCustomers = function (companyId, searchText) {
  let pattern = new RegExp(searchText, "i");
  return this.find({
    $and: [
      {
        userCompanyId: companyId, 
        isDeleted: false,
        $or: [
          { fullName: { $regex: pattern } },
          { ownerName: { $regex: pattern } },
        ],
      },
    ],
  });
};

customerSchema.statics.searchCustomersLight = function (companyId, searchText) {
  let pattern = new RegExp(searchText, "i");
  return this.find({
    $and: [
      {
        userCompanyId: companyId, 
        isDeleted: false,
        $or: [
          { fullName: { $regex: pattern } },
          { ownerName: { $regex: pattern } },
        ],
      },
    ],
  },{
    ownerName:1,
    fullName:1,
    rate:1
  });
};

const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
