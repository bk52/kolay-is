import { url } from "../constants/action-url";
import { api, ErrorHandler } from "./apiRoot";

function GetOrders() {
  return new Promise((resolve, reject) => {
    api
      .get(url.ORDERS)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

function GetOrder(_id) {
  return new Promise((resolve, reject) => {
    api
      .get(url.ORDERS, { params: { _id: _id } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

function SetOrder(order) {
  return new Promise((resolve, reject) => {
    api
      .post(url.ORDERS, { order })
      .then((response) => resolve(response.data))
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

function DeleteOrder(_id) {
  return new Promise((resolve, reject) => {
    api
      .delete(url.ORDERS, { params: { _id: _id } })
      .then((response) => resolve(response.data))
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

export { GetOrders, GetOrder, SetOrder, DeleteOrder };
