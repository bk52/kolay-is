import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConfirmProvider } from 'material-ui-confirm';
import store from "./redux/store";
import AppRouter from "./pages";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (   
        <Provider store={store}>
          <ConfirmProvider>
            <AppRouter></AppRouter>
          </ConfirmProvider>
        </Provider>
    );
  }
}
export default App;
