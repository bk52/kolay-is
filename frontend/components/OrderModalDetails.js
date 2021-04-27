import React, { useState, useEffect } from "react";
import datePickerFormat from "../common/datepickerFormat";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';

const OrderDetails=({order})=>{
    return(
        <Grid container spacing={1}>
        <Grid item xs={12}><TextField id="notes" name="notes" label="Sipariş Not" fullWidth/></Grid>
        <Grid item xs={4}>
         <TextField fullWidth id="deliveryDate" label="Teslim Tarihi" type="date" name="deliveryDate" value={datePickerFormat(order.deliveryDate)} InputLabelProps={{ shrink: true }} onChange={(e)=>{onValueChanged("deliveryDate",e.target.value)}}/>
        </Grid>
        <Grid item xs={4}>
          <CurrencyTextField label="Ön Ödeme" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} />
        </Grid>
        <Grid item xs={4} style={{marginTop:10,textAlign:"center"}}>
           Acil Sipariş {" "}<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}/>
        </Grid>
        <Grid item xs={12}><Button fullWidth onClick={null} variant="contained" startIcon={<SaveIcon />} color="primary">SİPARİŞ OLUŞTUR</Button></Grid>
      </Grid>
    )
}

export default OrderDetails;