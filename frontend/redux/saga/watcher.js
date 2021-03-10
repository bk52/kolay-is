import { takeEvery } from "redux-saga/effects";
import {types} from "../constants/action-types";

import {workerAuth} from "./Auth";
import {workerGetCustomer,workerSetCustomer,workerDeleteCustomer} from './Customer'
import {workerGetPayments} from "./CustomerPayments"

export default function* watcherSaga() {
    yield takeEvery(types.AUTH_SEND, workerAuth);
    yield takeEvery(types.CUSTOMER_GET,workerGetCustomer);
    yield takeEvery(types.CUSTOMER_SET_INFO,workerSetCustomer);
    yield takeEvery(types.CUSTOMER_DELETE,workerDeleteCustomer);
    yield takeEvery(types.CUSTOMER_PAYMENTS_GET,workerGetPayments);
}