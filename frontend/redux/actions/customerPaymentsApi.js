import { url } from "../constants/action-url";
import {api, ErrorHandler} from "./apiRoot";

function GetPayments(payload){
    let { customerId } = payload;
    return new Promise((resolve,reject)=>{
     api.get(url.PAYMENTS,{params:{customerId:customerId}})
      .then((response) =>{resolve(response.data)})
      .catch((error) => {ErrorHandler(error);reject(error);});
    })

}

function GetPaymentDetails(paymentId){
  return new Promise((resolve,reject)=>{
    api.get(url.PAYMENTS,{params:{paymentId:paymentId}})
    .then((response)=>{ resolve(response)})
    .catch((error) => {ErrorHandler(error); reject(error);})
  })
}

function GetPaymentStats(){
  return new Promise((resolve,reject)=>{
    api.get(url.PAYMENTS,{params:{activeStats:1}})
    .then((response)=>{ resolve(response)})
    .catch((error) => {ErrorHandler(error); reject(error);})
  })
}

function DeleteSubPayment(subPaymentId){
  return new Promise((resolve,reject)=>{
    api.delete(url.PAYMENTS,{params:{subPaymentId:subPaymentId}})
    .then((response)=>{resolve(response)})
    .catch((error) => {ErrorHandler(error); reject(error);})
 })
}

function AddSubPayment(subPayment){
  return new Promise((resolve,reject)=>{
    api.post(url.PAYMENTS,{subPayment})
    .then((response)=>{resolve(response)})
    .catch((error) => {ErrorHandler(error); reject(error);})
  })
}

function SetPayment(payment){
  return new Promise((resolve,reject)=>{
    api.post(url.PAYMENTS,{payment})
    .then((response)=>{resolve(response)})
    .catch((error) => {ErrorHandler(error); reject(error);})
  })
}

function DeletePayment(paymentId){
  return new Promise((resolve, reject) => {
    api.delete(url.PAYMENTS,{params:{paymentId:paymentId}})
    .then((response)=>{resolve(response)})
    .catch((error) => {ErrorHandler(error); reject(error);})
  })
}

export {
    GetPayments,
    GetPaymentDetails,
    GetPaymentStats,
    DeleteSubPayment,
    AddSubPayment,
    SetPayment,
    DeletePayment
  }