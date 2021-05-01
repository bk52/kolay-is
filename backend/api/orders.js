const express = require("express");
const router = express.Router();
const ordersModel = require(global.appRoot + "/db/models/orders");

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(function (req, res) {
     let { userCompanyId } = req.user;
     let { _id } = req.query;
     if(_id && _id!==""){
      ordersModel.getOrder(_id)
         .then((result) => {res.status(200).json({ result });})
         .catch((err) => {
            global.log(err, __filename, "e", "/orders");
            res.status(500).json({ message: "Internal Server Error" });
         });
     }
     else{
      ordersModel.getOrders(userCompanyId)
         .then((result) => {res.status(200).json({ result });})
         .catch((err) => {
            global.log(err, __filename, "e", "/orders");
            res.status(500).json({ message: "Internal Server Error" });
         });
     }
  })
  .post(function (req, res) {
     let { userCompanyId } = req.user;
     let { order } = req.body;
     if(order && order != ""){
        order.userCompanyId=userCompanyId;
        ordersModel.setOrder(order)
        .then((result) => {res.status(200).json({result});})
        .catch((err) => {
            global.log(err, __filename, "e", "/orders");
            res.status(500).json({ message: "Internal Server Error" });
         });
     }
     else{
        res.status(400).json({"message":"Bad Request"});
     }
  })
  .delete(function (req, res) {
     let { _id } = req.query;
     ordersModel
      .deleteOrder(_id)
      .then((result) => {res.status(200).json({ result });})
      .catch((err) => {
        global.log(err, __filename, "e", "/orders");
        res.status(500).json({ message: "Internal Server Error" });
      });
  });

module.exports = router;
