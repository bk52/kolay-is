import React, { useState, useEffect } from "react";
import datePickerFormat from "../common/datepickerFormat";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';

const OrderDetails=({order, onValueChanged,SaveOrder})=>{
    return(
        <Grid container spacing={1}>
        <Grid item xs={6}><TextField disabled id="fullName" name="fullName" label="Müşteri" fullWidth value={order.customer.customerName}/></Grid>
        <Grid item xs={6}><CurrencyTextField disabled label="Toplam Fiyat" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={order.orderStats.net} /></Grid>
        <Grid item xs={12}><TextField id="notes" name="notes" label="Sipariş Notu" value={order.note} onChange={(e)=>{onValueChanged("note",e.target.value)}} fullWidth/></Grid>
        <Grid item xs={4}>
         <TextField fullWidth id="deliveryDate" label="Teslim Tarihi" type="date" name="deliveryDate" value={datePickerFormat(order.deliveryDate)} InputLabelProps={{ shrink: true }} onChange={(e)=>{onValueChanged("deliveryDate",e.target.value)}}/>
        </Grid>
        <Grid item xs={4}>
          <CurrencyTextField label="Ön Ödeme" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={order.prepayment} onChange={(e)=>{onValueChanged("prepayment",e.target.value)}}/>
        </Grid>
        <Grid item xs={4} style={{marginTop:10,textAlign:"center"}}>
           Acil Sipariş {" "}<Checkbox checked={order.urgent} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} onChange={(e)=>{onValueChanged("urgent",!order.urgent)}}/>
        </Grid>
        <Grid item xs={12}><Button fullWidth onClick={SaveOrder} variant="contained" startIcon={<SaveIcon />} color="primary">SİPARİŞ OLUŞTUR</Button></Grid>
      </Grid>
    )
}

export default OrderDetails;