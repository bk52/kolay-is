import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import ReportCase from "../components/ReportCase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor:"pointer"
  },
  active:{
      backgroundColor:"#17A2B8",
      color:"white"
  },
  reportPaper:{
    padding:"8px",
    width:"500px",
    margin:"auto"
  }
}));

export default function ReportPage() {
  const classes = useStyles();
  const [selected,setSelected]=useState(0);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Paper className={[classes.paper, selected==1 ? classes.active : ""]} onClick={(e)=>{setSelected(1)}}>
            <AccountBalanceIcon /><br/>
            <Typography variant="button" gutterBottom>
              Kasa Raporu
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
        <Paper className={[classes.paper, selected==2 ? classes.active : ""]} onClick={(e)=>{setSelected(2)}}>
            <AttachMoneyIcon /><br/>
            <Typography variant="button" gutterBottom>
              Ürün Satış Raporları
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
        <Paper className={[classes.paper, selected==3 ? classes.active : ""]} onClick={(e)=>{setSelected(3)}}>
            <AccountBalanceWalletOutlinedIcon /><br/>
            <Typography variant="button" gutterBottom>
              Firma Hesap Özeti
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <br/>
      <Paper className={classes.reportPaper}>
          <ReportCase/>
      </Paper>
  
    </div>
  );
}
