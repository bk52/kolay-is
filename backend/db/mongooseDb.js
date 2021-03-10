const mongoose = require('mongoose');
const connectionString="mongodb://localhost:27017/kolayis"

mongoose.connection.on('error', err => {
    global.log(err,__filename,'e');
});

function Connect(){
    return new Promise((resolve,reject)=>{
        mongoose.connect(connectionString, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                keepAlive:true, 
                useFindAndModify: false,
                useCreateIndex:true,
            })
        .then((res)=>{
            resolve("Connection Successfull");
        })
        .catch((e)=>{
            global.log(e,__filename,'e',"Connect");
            reject(e);
        })
    })
}

module.exports={
    Connect
}