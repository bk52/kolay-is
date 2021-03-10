const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto-js");
const hmackey = process.env.HMAC_ENCYRPT_KEY;

const userSchema = new Schema(
  {
    username: { type: String, required: [true, "username is required"] },
    password: { type: String, required: [true, "password is required"] },
    firstname: String,
    lastname: String,
    userCompanyId: String,
    permissionLevel: Number,
    isAdmin: { type: Boolean, default: false },
    lastLogin: Date,
    isDeleted: { type: Boolean, default: false },
    deletedById: String,
    createdById:String
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

userSchema.statics.getUser = function(username, password) {
  if(username && username!=="" && password && password!==""){
    let cryptedPass=crypto.HmacSHA256(password, hmackey).toString();
    return this.findOne({username,password:cryptedPass,isDeleted:false}).lean()
  }
  else{
      return Promise.reject("Invalid username or password");
  } 
};

userSchema.statics.getUserById = function(id) {
  if(id){
    return this.findOne({_id:id},{
      username:1,
      userCompanyId:1,
      permissionLevel:1,
    }).lean()
  }
  else{
      return Promise.reject("Invalid id");
  } 
};

userSchema.statics.updateLastLogin = function(userId) {
  this.updateOne({_id:userId},{lastLogin:Date.now()})
  .then((res)=>{})
  .catch((err)=>{})
};

const userModel = mongoose.model("users", userSchema);
module.exports=userModel;

