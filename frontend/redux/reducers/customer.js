import { types } from "../constants/action-types";
import Toast from "../../components/Snackbar";

var initialState = {
  customerFormVal: {},
  customersList: [],
  loadingPage:true,
  openModal:false,
  customerFormLoading:true,
  reloadTable:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "Customer_SaveForm":
      return Object.assign({}, state, {
        customerFormVal: action.formVal,
      });
    case "Customer_ClearForm":
      return Object.assign({}, state, {
        customerFormVal: {},
      });
    case types.CUSTOMER_PAGE_LOADING:
      return Object.assign({}, state, {
        loadingPage: action.payload.loading,
        reloadTable: action.payload.reloadTable
      });
    case types.CUSTOMER_GET_RESP:
      return Object.assign({}, state, {
        openModal:true,
        customerFormLoading:false,
        customerFormVal: action.payload.result,
      });   
    case types.CUSTOMER_MODAL_OPEN:
      return Object.assign({}, state, {
        openModal:true,
        customerFormLoading:action.payload.loading,
      });  
    case types.CUSTOMER_MODAL_CLOSE:
      return Object.assign({}, state, {
        openModal:false,
        customerFormVal: {},
      });  
    case types.CUSTOMER_API_ERROR:{
      Toast.error("Hata Oluştu");
      console.error("CUSTOMER_API_ERROR " + JSON.stringify(action.payload));
      return Object.assign({}, state, {
        openModal:false,
        customerFormLoading:false,
        customerFormVal: {},
      }); 
    }
    case types.CUSTOMER_SET_RESP:{
      Toast.success("Bilgiler Kaydedildi");
      return Object.assign({}, state, {
        openModal:false,
        customerFormLoading:false,
        customerFormVal: {},
        loadingPage:true,
        reloadTable:true,
      });      
    }
    case types.CUSTOMER_MODAL_LOADING:
      return Object.assign({}, state, {
        customerFormLoading:action.payload.loading
      });  
    case types.CUSTOMER_DELETE_RESP:
      Toast.success("Kayıt Silindi");
      return Object.assign({}, state, {
        loadingPage:true,
        reloadTable:true,
      }); 
    default:
      return state;
  }
}
