import React, { useState } from "react";
import {useSelector} from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "../components/PrivateRouter";
import AppBar from "../components/AppBar";
import LeftMenu from "../components/LeftMenu";
import isLogin from "../common/isLogin";

import Login from "./HomePage";
import CustomerPage from "./CustomerPage";
import AccountBalancePage from "./AccountBalance";
import PageNF from "./NotFound";
import ComingSoonPage from "./ComingSoon";
import ReportPage from "./ReportPage";
import ProductPage from "./ProductPage";
import OrderPage from "./OrderPage";

const useStyles = makeStyles((theme) => ({
  router: {
    paddingTop: "74px",
    paddingRight: "10px",
    height: "100%",
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft: "10px",
  },
  routerWithMenu: {
    paddingTop: "74px",
    paddingRight: "10px",
    height: "100%",
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    paddingLeft: "210px",
  },
}));

export default function AppRouter() {
  const userState = useSelector( state => state.auth);
  const classes = useStyles();
  const [leftMenuOpen, setleftMenuOpen] = useState(true);

  function toggleLeftMenu() {
    setleftMenuOpen(!leftMenuOpen);
  }

  return (
    <div>
      <Router>
      {
        isLogin() ? <div><AppBar changeLeftMenu={toggleLeftMenu}></AppBar>
        <LeftMenu menuOpen={leftMenuOpen}></LeftMenu></div> : null        
    }
        <div className={leftMenuOpen ? classes.routerWithMenu : classes.router}>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/coming">
              <ComingSoonPage />
            </Route>
            <PrivateRoute path="/customers">
              <CustomerPage />
            </PrivateRoute>
            <PrivateRoute path="/accountBalance">
              <AccountBalancePage />
            </PrivateRoute>
            <PrivateRoute path="/reports">
              <ReportPage />
            </PrivateRoute>
            <PrivateRoute path="/products">
              <ProductPage />
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <OrderPage />
            </PrivateRoute>
            <Route path="*">
              <PageNF />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
