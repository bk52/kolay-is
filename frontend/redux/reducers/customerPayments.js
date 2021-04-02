import { types } from "../constants/action-types";
import Toast from "../../components/Snackbar";

var initialState = {
  customerInfo: {},
  paymentInfo: {},
  collectionInfo:{},
  paymentStats:{},
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CUSTOMER_PAYMENTS_GET_RESP:
    {
      let _income, _expense=[];
      if(action.payload && action.payload.customerBalance){
        _income=action.payload.customerBalance.filter((item)=> {return  item.paymentType==1});
        _expense=action.payload.customerBalance.filter((item)=> {return  item.paymentType==2});
      }
      return Object.assign({}, state, {
        isLoading: false,
        customerInfo: action.payload.customerInfo,
        paymentInfo: _income,
        collectionInfo:_expense,
        paymentStats:action.payload.balanceStats
      });
    }
    case types.CUSTOMER_PAYMENTS_API_ERROR: {
      Toast.error("Hata Oluştu");
      console.error("CUSTOMER_PAYMENTS_API_ERROR " + JSON.stringify(action.payload));
      return Object.assign({}, state, {
        customerInfo: {},
        paymentInfo: {},
        isLoading: false,
      });
    }
    case types.CUSTOMER_PAYMENTS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    default:
      return state;
  }
}
