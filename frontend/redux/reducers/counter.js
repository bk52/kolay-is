var initialState={
    count:0,
}

export default function (state = initialState, action) {
    switch (action.type) {
      case "UP":
        return Object.assign({}, state, {
            count: state.count+1,
        });
      case "DOWN":
        return Object.assign({}, state, {
            count: state.count-1,
        });
      default: return state;
    }
  }