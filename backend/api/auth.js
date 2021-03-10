const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require(global.appRoot + "/db/models/users");
const authCache=require(global.appRoot + "/cache/cache");

router.route('/')
.all(function(req,res,next){
    next();
})
.post(function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
        users.getUser(username,password)
        .then((_user)=>{
            if(_user && _user!==null){
                let payload = {
                    id:_user._id.toString(),
                    firstname:_user.firstname,
                    lastname:_user.lastname,
                    permissionLevel:_user.permissionLevel
                }
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE)
                })
                let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: parseInt(process.env.REFRESH_TOKEN_LIFE)
                })
                users.updateLastLogin(_user._id);
                authCache.setUser({id:_user._id.toString(),username:_user.username,companyId:_user.userCompanyId,permissionLevel:_user.permissionLevel,accessToken:accessToken});
                res.status(200).json({
                    "accessToken":accessToken,
                    "refreshToken":refreshToken
                })
            }
            else{
                res.status(200).json({"message":"Invalid username or password"});
            }
        })
        .catch((err)=>{
            global.log(err,__filename,'e',"/post");
            res.status(200).json({"message":"Invalid username or password"});
        })
})

module.exports = router;