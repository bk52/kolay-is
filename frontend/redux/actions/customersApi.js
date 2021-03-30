import { url } from "../constants/action-url";
import {api, ErrorHandler} from "./apiRoot";

function GetCustomer(payload) {
  let { customerId } = payload;
  return api.post(url.CUSTOMERS,{customerId:customerId})
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}

function SetCustomer(payload) {
  let { customerForm } = payload;
  return api.post(url.CUSTOMERS,{customerForm})
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}

function DeleteCustomer(payload) {
  let { _id } = payload;
  return api.delete(url.CUSTOMERS,{
    data: {
      _id: _id
    }
  })
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}

function GetCustomers(){
  return new Promise((resolve,reject)=>{
     api.get(url.CUSTOMERS,{})
     .then((response) => {resolve(response.data)})
     .catch((error) => {ErrorHandler(error); reject(error)});
  })
}

function FindCustomers(searchText, retry=false){
//   return new Promise((resolve,reject)=>{
//     api.post(url.SEARCH, { account: searchText })
//     .then((response)=>{
//       resolve(response)
//     })
//     .catch((error) => {
//       if(retry){
//         ErrorHandler(error); reject(error);
//       }
//       else{
//         FindCustomers(searchText,true)
//         .then((response)=>{resolve(response)})
//         .catch((error)=>{ErrorHandler(error); reject(error);})
//       }
//     })
//  })
  return new Promise((resolve, reject) => {
    api.post(url.SEARCH, { account: searchText })
    .then((response)=>{resolve(response)})
    .catch((error) => {ErrorHandler(error); reject(error);})
  })
}

export {
  GetCustomer,
  SetCustomer,
  GetCustomers,
  DeleteCustomer,
  FindCustomers
}