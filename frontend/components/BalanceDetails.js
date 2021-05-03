import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Fab from "@material-ui/core/Fab";
import Tabs from "./Tabs";
import Paper from "@material-ui/core/Paper";
import { types } from "../redux/constants/action-types";

import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import DetailsInfo from "./BalanceDetailsInfo";
import BalanceHistory from "./BalanceHistory";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const BalanceDetails = (props) => {
  const dispatch = useDispatch();
  const customerPaymentsState = useSelector((state) => state.customerPayments);
  const classes = useStyles();
  const isFirstTab = (val) => { };

  const Refresh=()=>{
    dispatch({
      type: types.CUSTOMER_PAYMENTS_GET,
      payload: { customerId: props.customerId },
    });
  }

  const tabList = [
    {
      index: 0,
      title: "GENEL BİLGİLER",
      icon: <AccountBoxIcon />,
      component: <DetailsInfo />,
    },
    {
      index: 1,
      title: "TAHSİLATLAR",
      icon: <ArrowDownwardIcon />,
      component: <BalanceHistory type={1} onRefresh={Refresh} />,
    },
    {
      index: 2,
      title: "BORÇLAR",
      icon: <ArrowUpwardIcon />,
      component: <BalanceHistory type={2} onRefresh={Refresh} />,
    },
  ];

  useEffect(() => {
    Refresh();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid style={{ padding: "0px", paddingBottom: "4px" }} item xs={12}>
          <Paper className={classes.header} style={{ padding: "8px" }}>
            <Grid container>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  onClick={props.GoAccountBalance}
                  style={{ paddingLeft: "8px" }}
                >
                  <ArrowBackIosIcon />
                </Fab>
              </Grid>
              <Grid
                item
                xs={11}
                style={{ textAlign: "left", paddingTop: "4px" }}
              >
                <Typography color="textSecondary" variant="h5" gutterBottom>
                  Hesap Detayları
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {customerPaymentsState.isLoading ? (
            <LinearProgress />
          ) : (
            <Tabs ref={null} tabList={tabList} isFirstTab={isFirstTab}></Tabs>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BalanceDetails;