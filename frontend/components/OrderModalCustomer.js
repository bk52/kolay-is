import React, { useState, useEffect } from "react";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Switch from '@material-ui/core/Switch';
import CustomerSearch from "./AutoComplete";
import PhoneField from "./PhoneField";

const OrderCustomer=()=>{
    const [newCustomer,setNewCustomer]=useState(false);
    const [nameError,setNameError]=useState(false);
    const onCustomerSelected=(e)=>{ console.log(e);}
    const SaveCustomer=()=>{}
    return(
        <Grid container spacing={1}>
        <Grid item xs={12} style={{textAlign:"center"}}>
            Kayıtlı Müşteri{" "}<Switch color="primary" checked={newCustomer} onChange={(e)=>setNewCustomer((prevState) => !prevState)}/>{" "}Yeni Müşteri
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {
              newCustomer ? <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <Grid item xs={4}><TextField id="fullName" name="fullName" label="Firma Adı" fullWidth error={nameError} helperText={nameError ? "Bu alan zorunludur" : ""}/></Grid>
              <Grid item xs={4}><TextField id="ownerName" name="ownerName" label="Yetkili" fullWidth/></Grid>
              <Grid item xs={4}><PhoneField id="tel1" name="tel1" label="Tel(1)" fullWidth/></Grid>
              <Grid item xs={12}> <Button fullWidth onClick={SaveCustomer} variant="contained" startIcon={<SaveIcon />} color="primary">KAYDET</Button></Grid>
              </Grid> : <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8 }}><Grid item xs={12}><CustomerSearch selectedChanged={onCustomerSelected}/></Grid></Grid>
            }
          </Paper>
        </Grid>
        <Grid item xs={12} style={{height:"50px"}}></Grid>
      </Grid>
    )
}

export default OrderCustomer;