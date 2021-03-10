import {createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import createSagaMiddleware from "redux-saga";

import counter from './reducers/counter';
import apiSaga from "./saga/watcher";
import auth from './reducers/auth';
import common from './reducers/common';
import customer from './reducers/customer';
import customerPayments from './reducers/customerPayments';

const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var cr=combineReducers({
    counter,
    auth,
    common,
    customer,
    customerPayments
});
const store = createStore(cr,storeEnhancers(applyMiddleware(initialiseSagaMiddleware)));
initialiseSagaMiddleware.run(apiSaga);
export default store;