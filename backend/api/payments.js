const express = require("express");
const router = express.Router();
const customers = require(global.appRoot + "/db/models/customers");
const customerPayments = require(global.appRoot +"/db/models/customerPayments");

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(async function (req, res) {
    let { userCompanyId } = req.user;
    let { customerId } = req.query;
    if (customerId) {
      try {
        let customerInfo = await customers.getCustomer(customerId);
        let customerBalance = await customerPayments.getPaymentsForCustomer(customerId);
        res.status(200).json({ customerInfo, customerBalance });
      } catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  });

module.exports = router;
