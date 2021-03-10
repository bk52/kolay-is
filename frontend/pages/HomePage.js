import React from 'react';
import Login from '../components/Login';
import isLogin from "../common/isLogin";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export default function HomePage() {
  const userState = useSelector( state => state.auth);
  return isLogin() ? <Redirect to="/customers" /> : <Login/>
}
