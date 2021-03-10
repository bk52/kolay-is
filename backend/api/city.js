const express = require('express');
const router = express.Router();
const {citiesModel,townsModel} = require(global.appRoot + "/db/models/cities");

router.route('/')
.all(function(req,res,next){
    next();
})
.get(function (req, res) {
    let{cityCode,townCode}=req.body;
    try{
        if(cityCode && cityCode!==""){
            townsModel.getTowns(cityCode)
            .then((result)=>{res.status(200).json({result});})
            .catch((err)=>{res.status(400).json({"message":"Bad Request"});})
        }
        else if(townCode && townCode!==""){
            townsModel.getTown(townCode)
            .then((result)=>{res.status(200).json({result});})
            .catch((err)=>{res.status(400).json({"message":"Bad Request"});})
        }
        else{
            citiesModel.getCities()
            .then((result)=>{res.status(200).json({result});})
            .catch((err)=>{res.status(400).json({"message":"Bad Request"});})
        }
    }
    catch(err){
        global.log(err,__filename,'e',"/city");
    }
})

module.exports = router;