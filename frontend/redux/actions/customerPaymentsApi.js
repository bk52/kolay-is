import { url } from "../constants/action-url";
import {api, ErrorHandler} from "./apiRoot";

function GetPayments(payload){
    let { customerId } = payload;
    return api.get(url.PAYMENTS,{params:{
        customerId:customerId
    }})
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}

function GetPaymentDetails(paymentId, retry=false){
    return new Promise((resolve,reject)=>{
        api.get(url.PAYMENTS,{params:{
            paymentId:paymentId
        }})
        .then((response)=>{
          resolve(response)
        })
        .catch((error) => {
          if(retry){
            ErrorHandler(error); reject(error);
          }
          else{
            GetPaymentDetails(paymentId,true)
            .then((response)=>{resolve(response)})
            .catch((error)=>{ErrorHandler(error); reject(error);})
          }
        })
     })
}

function DeleteSubPayment(subPaymentId, retry=false){
  return new Promise((resolve,reject)=>{
    api.delete(url.PAYMENTS,{params:{
      subPaymentId:subPaymentId
    }})
    .then((response)=>{
      resolve(response)
    })
    .catch((error) => {
      if(retry){
        ErrorHandler(error); reject(error);
      }
      else{
        DeleteSubPayment(subPaymentId,true)
        .then((response)=>{resolve(response)})
        .catch((error)=>{ErrorHandler(error); reject(error);})
      }
    })
 })
}

function AddSubPayment(subPayment, retry=false){
  return new Promise((resolve,reject)=>{
    api.post(url.PAYMENTS,{subPayment})
    .then((response)=>{resolve(response)})
    .catch((error) => {
      if(retry){ErrorHandler(error); reject(error);}
      else{
        AddSubPayment(subPayment,true)
        .then((response)=>{resolve(response)})
        .catch((error)=>{ErrorHandler(error); reject(error);})
      }
    })
  })
}

export {
    GetPayments,
    GetPaymentDetails,
    DeleteSubPayment,
    AddSubPayment
  }