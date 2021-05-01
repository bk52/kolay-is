const path = require("path");
const cLog = require("./common/logger");
const duration = require("./common/duration");
const port =process.env.PORT;
global.appRoot = path.resolve(__dirname);
global.log = cLog.Log;
global.duration = duration;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const db = require("./db/mongooseDb");
const app = express();

const authRouter = require("./api/auth");
const cityRouter = require("./api/city");
const customerRouter = require("./api/customers");
const paymentRouter  =require("./api/payments");
const tokenRouter = require("./api/token");
const searchRouter = require("./api/search");
const productRouter = require("./api/products");
const orderRouter=require("./api/orders");
const logMiddleware = require("./common/middleware/reqLogger");
const verifyMiddleware = require("./common/middleware/verifyToken");

 const orderDB = require("./db/models/orders");

db.Connect()
  .then((res) => {
    global.log(res, __filename, "s");
    app.use(bodyParser.json());
    app.use(cors());
    app.use(mongoSanitize({ replaceWith: "_" }));
    //app.use(logMiddleware);
    app.use(express.static("publish"));
    app.use("/api/auth", authRouter);
    app.use("/api/city", cityRouter);
    app.use("/api/customers", verifyMiddleware, customerRouter);
    app.use("/api/payments", verifyMiddleware, paymentRouter);
    app.use("/api/token", tokenRouter);
    app.use("/api/search", verifyMiddleware, searchRouter);   
    app.use("/api/products", verifyMiddleware, productRouter);   
    app.use("/api/orders", verifyMiddleware, orderRouter);
    app.listen(port, () => console.log("Server Ready On port " + port));

    // orderDB.getOrders()
    // .then(data=>console.log(data))
    // .catch(err=>console.log(err))

  })
  .catch((err) => {
    global.log(err, __filename, "e");
  });
