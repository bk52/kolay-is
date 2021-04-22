const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = new Schema(
    {
      userCompanyId: String,
      productName: String,
      description:String,
      productUnit:String,
      unitPrice:Number,
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

productsSchema.index({ productName: "text" });

productsSchema.statics.getProducts = function (userCompanyId) {
    return this.find({ userCompanyId: userCompanyId, isDeleted: false }).lean();
}

productsSchema.statics.getProduct = function (_id) {
    return this.find({ _id: _id, isDeleted: false }).lean();
}

productsSchema.statics.setProduct=function(product){
    return new Promise((resolve, reject) => {
        if(product._id && product._id!==""){
            this.findById(product._id, (err, res) => {
                if (err) reject({ message: err.message });
                else {
                  res.set(product);
                  res.save((saveErr, uptProduct) => {saveErr ? reject({ message: saveErr.message }) : resolve(uptProduct)});
                }
            });
        }
        else{
            let newProduct = new productModel(product);
            newProduct.save((saveErr, uptProduct) => {
                saveErr ? reject({ message: saveErr.message }) : resolve(uptProduct);
            });
        }
    })
}

productsSchema.statics.deleteProduct = function (productId) {
    return this.findOneAndUpdate({ _id: productId },{ isDeleted: true },{ fields: { _id: 1 }, new: true }).lean();
};

const productModel = mongoose.model("products", productsSchema);
module.exports = productModel;