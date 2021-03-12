import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

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

export default function BalanceNew(props) {
  const classes = useStyles();
  const formRef = useRef();
  const [curErr, setcurErr] = useState(false);
  const handleClose = () => {
    props.Close();
  };
  const saveForm=()=>{
    let initialBalance = formRef.current["initialBalance"].value;
    let customerId=formRef.current["customerId"].value;
    if(initialBalance && customerId){
        let _values ={
            customerId:customerId,
            description:formRef.current["description"].value,
            initialBalance:initialBalance,
        }
        alert("Ödemeyi KAYDET");
    }
    else{
        setcurErr(true);
    }
  }
  return (
    <div className={classes.root}>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        disableBackdropClick={true}
      >
        <DialogTitle className={classes.modal} id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
          <Grid item xs={12} style={{display:"none"}}>
            <TextField disabled id="customerId" name="customerId"  value={props.customerId}/>
           </Grid>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Açıklama"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <CurrencyTextField
                  label="İlk Bakiye"
                  variant="standard"
                  currencySymbol="₺"
                  outputFormat="string"
                  minimumValue="0"
                  decimalPlaces={2}
                  id="initialBalance"
                  error={curErr}
                  helperText={curErr ? "Geçerli bir bakiye giriniz" : null}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
            <Button
              onClick={saveForm}
              variant="contained"
              startIcon={<SaveIcon />}
              color="primary"
            >
              KAYDET
            </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            startIcon={<CloseIcon />}
          >
            İPTAL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
