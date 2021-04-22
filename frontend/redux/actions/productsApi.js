import { url } from "../constants/action-url";
import { api, ErrorHandler } from "./apiRoot";

function GetProducts() {
  return new Promise((resolve, reject) => {
    api
      .get(url.PRODUCTS)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

function GetProduct(_id) {
  return new Promise((resolve, reject) => {
    api
      .get(url.PRODUCTS, { params: { _id: _id } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

function SetProduct(product) {
  return new Promise((resolve, reject) => {
    api
      .post(url.PRODUCTS, { product })
      .then((response) => resolve(response.data))
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

function DeleteProduct(_id) {
  return new Promise((resolve, reject) => {
    api
      .delete(url.PRODUCTS, { params: { _id: _id } })
      .then((response) => resolve(response.data))
      .catch((error) => {
        ErrorHandler(error);
        reject(error);
      });
  });
}

export { GetProducts, GetProduct, SetProduct, DeleteProduct };
