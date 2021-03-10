const jwt = require("jsonwebtoken");
const authCache=require(global.appRoot + "/cache/cache");
const users = require(global.appRoot + "/db/models/users");

function verify(req,res,next){
    try{
        let token=req.headers['authorization'].split(' ')[1];
        if(token && token!==""){
            let payload= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            let userCompanyId="";
            let cacheUser=authCache.getUser(payload.id);
            
            if(cacheUser){
                userCompanyId=cacheUser.companyId;
                req.user={"id":payload.id,"userCompanyId":userCompanyId};
                next();
            }
            else{
                users.getUserById(payload.id)
                .then((_user)=>{
                    authCache.setUser(
                        {id:_user._id.toString(),
                        username:_user.username,
                        companyId:_user.userCompanyId,
                        permissionLevel:_user.permissionLevel,
                        accessToken:token});
                    req.user={"id":payload.id,"userCompanyId":userCompanyId};
                    next();
                })
                .catch((err)=>{
                    global.log(err,__filename,'e',"verify");
                    res.status(401).json({"message":"Invalid token"});
                })
            }
            /// Control cache for accessTokenSecret exist for user
            /// To use this set cache.multipleToken=true
            // if(payload.id && payload.id!==""){
            //     if(authCache.isTokenExist(payload.id,token)){
            //         next();
            //     }
            //     else{
            //         res.status(401).json({"message":"Invalid token"});
            //     }
            // }
            // else{
            //     res.status(401).json({"message":"Invalid token"});
            // }           
        }
        else{
            res.status(401).json({"message":"Invalid token"});
        }      
    }
    catch(e){
        global.log(e,__filename,'e',"verify");
        res.status(401).json({"message":"Invalid token"});
    }
  
}

module.exports=verify;
