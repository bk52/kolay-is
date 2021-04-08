import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import ReportCase from "../components/ReportCase";
import ReportCompanyAccount from "../components/ReportCompanyAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  active: {
    backgroundColor: "#17A2B8",
    color: "white",
  },
  reportPaper: {
    padding: "8px",
    width: "500px",
    margin: "auto",
  },
}));

const ReportTypes = [
  { id: 0, title: "KASA RAPORU", icon: <AccountBalanceIcon /> },
  { id: 1, title: "ÜRÜN SATIŞ RAPORU", icon: <AttachMoneyIcon /> },
  { id: 2, title: "FİRMA HESAP ÖZETİ", icon: <AccountBalanceWalletOutlinedIcon />},
];

export default function ReportPage() {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const onNewReport=(data)=>{console.log(data)}
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {ReportTypes.map((item) => {
          return <Grid item xs={12} md={4}>
            <Paper className={[classes.paper, selected == item.id ? classes.active : ""]} onClick={(e) => {setSelected(item.id);}}>
              {item.icon}<br /><Typography variant="button" gutterBottom>{item.title}</Typography>
            </Paper>
          </Grid>;
        })}
      </Grid>
      <br />
      {selected==0 || selected == 1 ? <Paper className={classes.reportPaper}><ReportCase title={ReportTypes[selected].title} onNewReport={onNewReport}/></Paper> : null}
      {selected==2 ? <Paper className={classes.reportPaper}><ReportCompanyAccount title={ReportTypes[selected].title} onNewReport={onNewReport}/></Paper> : null}
    </div> 
  );
}
