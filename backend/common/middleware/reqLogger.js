function RequestLogger(req,res,next){
    console.log("Date -> " + new Date());
    console.log("Ip -> " + req.ip);
    console.log("Target -> " + req.baseUrl);
    console.log("Method -> " + req.method);
    // console.log("Body -> " + JSON.stringify(req.body));
    next();
}

module.exports=RequestLogger;
