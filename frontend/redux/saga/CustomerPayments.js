import {types} from "../constants/action-types";
import { call, put } from "redux-saga/effects";
import {GetPayments} from "../actions/customerPaymentsApi";

export function* workerGetPayments(action) {
    try {
      const payload = yield call(GetPayments, action.payload);
      yield put({ type: types.CUSTOMER_PAYMENTS_GET_RESP, payload });
    } catch (e) {
      yield put({ type: types.CUSTOMER_PAYMENTS_API_ERROR, payload: e });
    }
}
