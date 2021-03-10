import { url } from "../constants/action-url";
import {api, ErrorHandler} from "./apiRoot";

export function Login(payload) {
  let { username, password } = payload;

  //fetch
  // return fetch(url.AUTH,{method:"post", body: JSON.stringify({username,password}), headers: {
  //     'Content-Type': 'application/json'
  //   }},)
  // .then(response => response.json())

  //axios
  // return axios.post(url.AUTH, {username,password}, {headers: { "Access-Control-Allow-Origin": "*",'Content-Type': 'application/json'}})
  // .then(response => response.data)
  // .catch(error => {
  //   if(error.response && error.response.data)
  //     throw error.response.data
  //   else throw error;
  // })

  return api.post(url.AUTH,{ username, password })
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}
