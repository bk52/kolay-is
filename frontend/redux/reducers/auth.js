import { types } from "../constants/action-types";
import {parseJwt} from "../../common/jwt";

var initialState = {
  isLoading:false,
  isAuthError: false,
  authErrorMessage: "",
  isLogin:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.AUTH_RESPONSE: {
      let { accessToken, refreshToken } = action.payload;
      if (accessToken && accessToken != "") {     
        let authInfo = parseJwt(accessToken);
        let responseInfo = {id: authInfo.id, firstname:authInfo.firstname, lastname:authInfo.lastname,  permissionLevel: authInfo.permissionLevel};
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userInfo", responseInfo);
        return Object.assign({}, state, {
            isAuthError: false,
            authErrorMessage: "",
            isLoading:false,
            isLogin:true
        });
      }
      else{
        let { message } = action.payload;
        return Object.assign({}, state, {
          isAuthError: true,
          isLoading:false,
          authErrorMessage: message,
        });
      } 
    }
    case types.AUTH_ERROR: {
      return Object.assign({}, state, {
        isAuthError: true,
        authErrorMessage: "Connection Error",
        isLoading:false,
      });
    }
    case types.AUTH_LOGOUT:{
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      return Object.assign({}, state, {
        isAuthError: false,
        authErrorMessage: "",
        isLoading:false,
        isLogin:false
    });
    }
    case types.AUTH_LOADING:{
      return Object.assign({}, state, {
        isLoading: action.payload.loading,
      });
    }
    default:
      return state;
  }
}
