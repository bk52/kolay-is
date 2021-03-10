import React from 'react';
import {
    Route,
    Redirect,
  } from 'react-router-dom';
import isLogin from "../common/isLogin";
import {useSelector} from "react-redux";

export default function PrivateRoute({ children, ...rest }) {
  const userState = useSelector( state => state.auth);
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isLogin() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }