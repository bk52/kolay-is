const express = require("express");
const router = express.Router();
const customers = require(global.appRoot + "/db/models/customers");
const customerPayments = require(global.appRoot +
  "/db/models/customerPayments");

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(async function (req, res) {
    let { userCompanyId } = req.user;
    let { customerId, paymentId } = req.query;
    if (customerId) {
      try {
        let customerInfo = await customers.getCustomer(customerId);
        let customerBalance = await customerPayments.getPaymentsForCustomer(
          customerId
        );
        res.status(200).json({ customerInfo, customerBalance });
      } catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (paymentId) {
      try {
        let paymentInfo = await customerPayments.getPaymentById(paymentId);
        res.status(200).json({ paymentInfo });
      } catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  })
  .post(function (req,res){
    let { subPayment ,payment } = req.body;
    if(subPayment){
      if(subPayment.parentId && subPayment.payment){
        customerPayments.setsubPayment(subPayment)
        .then((result)=>{res.status(200).json({});})
        .catch((err)=>{ res.status(500).json({ message: err });})
      }
      else{
        res.status(400).json({ message: "Bad Request" });
      }
    }
    else if(payment){
      if(!payment._id){
        let _now= new Date();
        payment.lastPaymentDate= new Date( _now.setMonth(_now.getMonth()+1));
      }
      customerPayments.setPayment(payment)
      .then((result)=>{res.status(200).json({});})
      .catch((err)=>{res.status(500).json({ message: "Internal Server Error" });})
    }

  })
  .delete(function (req, res) {
    let { paymentId, subPaymentId } = req.query;
    if (paymentId) {
      customerPayments
        .deletePayment(paymentId)
        .then((result) => {res.status(200).json({});})
        .catch((err) => {
          global.log(err, __filename, "e", "/payments");
          res.status(500).json({ message: "Internal Server Error" });
        });
    } else if (subPaymentId) {
      customerPayments
      .deleteSubPayment(subPaymentId)
      .then((result) => {
        res.status(200).json({});
      })
      .catch((err) => {
        global.log(err, __filename, "e", "/payments");
        res.status(500).json({ message: "Internal Server Error" });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });

module.exports = router;
