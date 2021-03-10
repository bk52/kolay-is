import { url } from "../constants/action-url";
import {api, ErrorHandler} from "./apiRoot";

export function Token() {
  let token = localStorage.getItem("refreshToken");
  return api.post(url.TOKEN,{ token })
    .then((response) => response.data)
    .catch((error) => {ErrorHandler(error);});
}
