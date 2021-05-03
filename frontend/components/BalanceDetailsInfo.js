import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PhoneField from "./PhoneField";
import FormControl from "@material-ui/core/FormControl";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    rate: {
      paddingTop: "15px",
    },
  }));


export default function BalanceDetailsInfo(){
    const classes = useStyles();
    const details = useSelector((state) => state.customerPayments);
    return(
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <TextField disabled value={details.customerInfo.fullName} label="Firma Adı" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField disabled value={details.customerInfo.ownerName} label="Yetkili" fullWidth />
                </Grid>
                {/* <Grid item xs={3}>
                    <TextField disabled value={props.taxAdress} label="Vergi Dairesi" fullWidth />
                </Grid> */}
                <Grid item xs={12} md={3}>
                    <PhoneField disabled={true} value={details.customerInfo.tel1} label="Tel(1)" fullWidth />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField disabled value={details.customerInfo.mail} label="Mail" fullWidth />
                </Grid>
                <Grid item xs={12} md={8}>
                    <TextField disabled value={details.customerInfo.adress} label="Adres" fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField disabled value={details.customerInfo.cityName.name} label="İl" fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField disabled value={details.customerInfo.townName.name} label="İlçe" fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControl>
                    <Rating
                        readOnly
                        className={classes.rate}
                        id="rate"
                        name="rate"
                        value={details.customerInfo.rate}
                    />
                </FormControl>
                </Grid>
            </Grid>
    )
}