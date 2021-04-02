import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

export default function PaymentInfo(props){
    const classes = useStyles();
    return (
        <Grid container spacing={1}>
               <Grid item xs={12} md={4}>
                 <Paper className={classes.paper} style={{fontWeight:"bold", color:"#28A745", height: "50px", paddingTop:"15px"}}>
                   {props.paymentType=="1" ? "Toplam Tahsilat" : "Toplam Borç"} :  
                   {props.paymentType=="1" ?  props.stats.incomeSum :  props.stats.expenseSum} ₺
                  </Paper>
                </Grid>
               <Grid item xs={12} md={4}>
                 <Paper className={classes.paper} style={{fontWeight:"bold",color:"#007BFF", height: "50px", paddingTop:"15px"}}>
                   Aktif Ödeme : {props.paymentType=="1" ?  props.stats.incomeActive :  props.stats.expenseActive} ₺
                  </Paper>
                </Grid>
               <Grid item xs={12} md={4}>
                 <Paper className={classes.paper} style={{fontWeight:"bold",color:"#DC3545", height: "50px", paddingTop:"15px"}}>
                   Gecikmiş Ödeme : {props.paymentType=="1" ?  props.stats.incomeDelayed :  props.stats.expenseDelayed} ₺
                  </Paper>
                </Grid>
        </Grid>
    )
}