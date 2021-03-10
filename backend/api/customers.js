const express = require("express");
const router = express.Router();
const customers = require(global.appRoot + "/db/models/customers");

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(function (req, res) {
    let { userCompanyId } = req.user;
    let { searchText } = req.body;
    try {
      if (searchText && searchText != "") {
        customers
          .searchCustomers(searchText)
          .then((result) => {
            res.status(200).json({ result });
          })
          .catch((err) => {
            global.log(err, __filename, "e", "/customers");
            res.status(400).json({ message: "Bad Request" });
          });
      } else {
        customers
          .getCompanyCustomers(userCompanyId)
          .then((result) => {
            res.status(200).json({ result });
          })
          .catch((err) => {
            global.log(err, __filename, "e", "/customers");
            res.status(400).json({ message: "Bad Request" });
          });
      }
    } catch (err) {
      global.log(err, __filename, "e", "/customers");
    }
  })
  .post(function (req, res) {
    let { userCompanyId } = req.user;
    let { customerId,customerForm } = req.body;
    if (customerId && customerId != "") {
      customers
        .getCustomer(customerId)
        .then((result) => {
          res.status(200).json({ result });
        })
        .catch((err) => {
          global.log(JSON.stringify(err), __filename, "e", "/customers");
          res.status(400).json({ message: "Bad Request" });
        });
    } else if(customerForm) {
      customerForm.userCompanyId=userCompanyId;
      customers
        .setCustomer(customerForm)
        .then((result) => {
          res.status(200).json({ result });
        })
        .catch((err) => {
          global.log(JSON.stringify(err), __filename, "e", "/customers");
          res.status(400).json({ message: "Bad Request" });
        });
    }
  })
  .delete(function (req, res) {
    let { _id } = req.body;
    customers
      .deleteCustomer(_id)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        global.log(err, __filename, "e", "/customers");
        res.status(400).json({ message: "Bad Request" });
      });
  });

module.exports = router;
