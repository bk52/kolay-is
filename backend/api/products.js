const express = require("express");
const router = express.Router();
const products = require(global.appRoot + "/db/models/products");

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(function (req, res) {
     let { userCompanyId } = req.user;
     let { _id } = req.query;
     if(_id && _id!==""){
         products.getProduct(_id)
         .then((result) => {res.status(200).json({ result });})
         .catch((err) => {
            global.log(err, __filename, "e", "/products");
            res.status(500).json({ message: "Internal Server Error" });
         });
     }
     else{
         products.getProducts(userCompanyId)
         .then((result) => {res.status(200).json({ result });})
         .catch((err) => {
            global.log(err, __filename, "e", "/products");
            res.status(500).json({ message: "Internal Server Error" });
         });
     }
  })
  .post(function (req, res) {
     let { userCompanyId } = req.user;
     let { product } = req.body;
     if(product && product != ""){
        product.userCompanyId=userCompanyId;
        products.setProduct(product)
        .then((result) => {res.status(200).json({result});})
        .catch((err) => {
            global.log(err, __filename, "e", "/products");
            res.status(500).json({ message: "Internal Server Error" });
         });
     }
     else{
        res.status(400).json({"message":"Bad Request"});
     }
  })
  .delete(function (req, res) {
     let { _id } = req.query;
     products
      .deleteProduct(_id)
      .then((result) => {res.status(200).json({ result });})
      .catch((err) => {
        global.log(err, __filename, "e", "/products");
        res.status(500).json({ message: "Internal Server Error" });
      });
  });

module.exports = router;
