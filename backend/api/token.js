const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authCache=require(global.appRoot + "/cache/cache");

router.route('/')
.all(function(req,res,next){
    next();
})
.post(function (req, res){
   try{
    let refreshToken = req.body.token;
    if(refreshToken && refreshToken!==""){
        let payload= jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);    
        delete payload["iat"];
        delete payload["exp"];
        let newAccessToken=jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE)
        });
        let userId=payload.id.toString();
        authCache.setToken(userId,newAccessToken);
        res.status(200).json({token:newAccessToken});
    }
    else{
        res.status(401).json({"message":"Invalid token"});
    }
   }
   catch(e){
    global.log(e,__filename,'e',"post");
    res.status(401).json({"message":"Invalid token"});
   }
})

module.exports = router;

