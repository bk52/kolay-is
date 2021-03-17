import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    padding: theme.spacing(0),
  },
}));

function PaymentInfo(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <TextField disabled value={""} label="Açıklama" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <CurrencyTextField label="İlk Bakiye" variant="standard" currencySymbol="₺" outputFormat="string" decimalPlaces={2} disabled/>
        </Grid>
        <Grid item xs={12} md={4}>
          <CurrencyTextField label="Ödeme Toplamı" variant="standard" currencySymbol="₺" outputFormat="string" decimalPlaces={2} disabled/>
        </Grid>
        <Grid item xs={12} md={4}>
          <CurrencyTextField label="Kalan Bakiye" variant="standard" currencySymbol="₺" outputFormat="string" decimalPlaces={2} disabled/>
        </Grid>
      </Grid>
    </div>
  );
}

const _list= [
    {
      "isDeleted": false,
      "_id": "601bd1542df40f2ca8a769df",   
      "payment": "10",
      "description": "Birinci taksit",     
      "updatedDate": "2021-02-04T10:50:35.386Z",
      "createdDate": "2021-02-04T10:49:56.833Z"
    },
    {
      "isDeleted": false,
      "_id": "6034d38988869d0d5cd8a8e3",   
      "payment": "50.5",
      "description": "Üçüncü taksit",      
      "updatedDate": "2021-02-23T10:06:01.923Z",
      "createdDate": "2021-02-23T10:06:01.923Z"
    },
    {
      "isDeleted": false,
      "_id": "6034d3a49383c91b9cf1cae8",   
      "payment": "20.25",
      "description": "Dördüncü taksit",    
      "updatedDate": "2021-02-23T10:06:28.814Z",
      "createdDate": "2021-02-23T10:06:28.814Z"
    }
  ]

function PaymentHistory({list}){
    return(
        <div style={{maxHeight:"300px", overflowY:"scroll"}}>
           {
                list.map((item)=>{                  
                       return <Card key={item._id}>
                       <CardContent>
                            <Typography>{item.description}</Typography>
                            <Typography>{item.payment}</Typography>
                            <Typography>{item.createdDate}</Typography>
                            </CardContent>
                        <CardActions></CardActions>
                       </Card>
                })
           }
        </div>
    )
}

export default function BalancePaymentDetails(props) {
  const classes = useStyles();

  useEffect(() => {
    // dispatch({
    //     //API Call
    // });
  }, []);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.Close}
        fullWidth={true}
        maxWidth={"md"}
        disableBackdropClick={true}
      >
        <DialogTitle id="alert-dialog-title">Ödeme Detayları</DialogTitle>
        <DialogContent>
            <div>
            <PaymentInfo/>
          <PaymentHistory list={_list}/>
            </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={null}
            variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
          >
            KAYDET
          </Button>
          <Button
            onClick={props.Close}
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
