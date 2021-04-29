import React, { useState, useEffect, useRef } from "react";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Switch from '@material-ui/core/Switch';
import CustomerSearch from "./AutoComplete";
import PhoneField from "./PhoneField";
import {SetCustomer} from "../redux/actions/customersApi";
import Toast from "./Snackbar";

const OrderCustomer = ({ onValueChanged }) => {
  const formRef = useRef();
  const [newCustomer, setNewCustomer] = useState(false);
  const [nameError, setNameError] = useState(false);

  const onCustomerSelected = (e) => {
    if (e && e._id) {
      onValueChanged("customer", { _id: e._id, fullName: e.fullName })
    }
  }
  const SaveCustomer = () => {
    if(formRef && formRef.current){
      let fullName=formRef.current["fullName"].value;
      let ownerName=formRef.current["ownerName"].value;
      let tel1=formRef.current["tel1"].value;
      if(fullName==""){
        setNameError(true);
        return;
      }
      SetCustomer({customerForm:{fullName,ownerName,tel1}})
      .then((data)=>{
        if(data && data.result){
          Toast.success("Yeni Müşteri Kaydedildi");
          onValueChanged("customer", { _id: data.result._id, fullName: data.result.fullName })
        }
      })
      .catch((err)=>{Toast.error("HATA! Kayıt Oluşturulamadı", console.log(err))})

    }
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        Kayıtlı Müşteri{" "}<Switch color="primary" checked={newCustomer} onChange={(e) => setNewCustomer((prevState) => !prevState)} />{" "}Yeni Müşteri
        </Grid>
      <Grid item xs={12}>
        <Paper>
          {
            newCustomer ? <form ref={formRef}>
              <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8 }}>
                <Grid item xs={4}><TextField id="fullName" name="fullName" label="Firma Adı" fullWidth error={nameError} helperText={nameError ? "Bu alan zorunludur" : ""} /></Grid>
                <Grid item xs={4}><TextField id="ownerName" name="ownerName" label="Yetkili" fullWidth /></Grid>
                <Grid item xs={4}><PhoneField id="tel1" name="tel1" label="Tel(1)" fullWidth  onChange={(e)=>{}}/></Grid>
                <Grid item xs={12}> <Button fullWidth onClick={SaveCustomer} variant="contained" startIcon={<SaveIcon />} color="primary">KAYDET</Button></Grid>
              </Grid>
            </form> : <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8 }}><Grid item xs={12}><CustomerSearch selectedChanged={onCustomerSelected} /></Grid></Grid>
          }
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ height: "50px" }}></Grid>
    </Grid>
  )
}

export default OrderCustomer;