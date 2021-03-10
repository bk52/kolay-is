import { types } from "../constants/action-types";

var initialState={
    apiError:"",
}

export default function (state = initialState, action) {
    switch (action.type) {
      case types.API_ERROR:
        return Object.assign({}, state, {
            apiError: action.payload.message,
        });
      default: return state;
    }
}