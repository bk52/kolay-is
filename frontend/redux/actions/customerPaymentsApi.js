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

export {
    GetPayments
  }