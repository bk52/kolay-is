import { url } from "../constants/action-url";
import {api, ErrorHandler} from "./apiRoot";

function GetPayments(payload){
    let { customerId } = payload;
    return api.get(url.PAYMENTS,{params:{customerId:customerId}})
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}

function GetPaymentDetails(paymentId){
  return new Promise((resolve,reject)=>{
    api.get(url.PAYMENTS,{params:{paymentId:paymentId}})
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
    DeleteSubPayment,
    AddSubPayment,
    SetPayment,
    DeletePayment
  }