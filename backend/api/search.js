const express = require("express");
const router = express.Router();
const customers = require(global.appRoot + "/db/models/customers");

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .post(function (req, res) {
    let { userCompanyId } = req.user;
    let { account} = req.body;

    if(userCompanyId){
        if(account && account.length>2){
            customers
            .searchCustomersLight(userCompanyId,account)
            .then((result) => { res.status(200).json({ result });})
            .catch((err) => {global.log(JSON.stringify(err), __filename, "e", "/search"); res.status(400).json({ message: "Bad Request" });
        });
        }
    }
    else{
        res.status(400).json({"message":"Bad Request"});
    }
  })

module.exports = router;
