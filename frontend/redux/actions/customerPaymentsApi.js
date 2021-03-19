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

function GetPaymentDetails(paymentId){
    // return new Promise((resolve,reject)=>{
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
}

export {
    GetPayments,
    GetPaymentDetails
  }