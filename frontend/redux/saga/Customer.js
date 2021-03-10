import {types} from "../constants/action-types";
import { call, put } from "redux-saga/effects";
import {GetCustomer, SetCustomer, DeleteCustomer} from "../actions/customersApi";

export function* workerGetCustomer(action) {
    try {
      const payload = yield call(GetCustomer, action.payload);
      yield put({ type: types.CUSTOMER_GET_RESP, payload });
    } catch (e) {
      yield put({ type:types.CUSTOMER_API_ERROR, payload: e });
    }
}
export function* workerSetCustomer(action) {
  try {
    const payload = yield call(SetCustomer, action.payload);
    yield put({ type: types.CUSTOMER_SET_RESP, payload });
  } catch (e) {
    yield put({ type:types.CUSTOMER_API_ERROR, payload: e });
  }
}
export function* workerDeleteCustomer(action) {
  try {
    const payload = yield call(DeleteCustomer, action.payload);
    yield put({ type: types.CUSTOMER_DELETE_RESP, payload });
  } catch (e) {
    yield put({ type:types.CUSTOMER_API_ERROR, payload: e });
  }
}