import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
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
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import formatDate from "../common/formatDate";
import { useConfirm } from "material-ui-confirm";
import {GetPaymentDetails,DeleteSubPayment,AddSubPayment,SetPayment,DeletePayment} from "../redux/actions/customerPaymentsApi";
import Toast from "./Snackbar";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  root: {flexGrow: 1},
  modal: {padding: theme.spacing(0),},
}));

const PaymentInfo = forwardRef((props, ref) => {
  const {info}=props;
  const classes = useStyles();
  const [formVal, setformVal] = useState({description: "",lastPaymentDate: "",});
  const setter = (value) => {return value ? value : "";};
  const dateFormat = (value) => {
    let res = "";
    res=value;
    if (value && value.includes("T")) {res = value.split("T")[0];}
    return res;
  };
  useEffect(() => {setformVal({description: info.description,lastPaymentDate: info.lastPaymentDate,});}, [info]);
  useImperativeHandle(ref, () => ({
    SavePayment() {
      let payment={ _id:info._id,description:formVal.description,lastPaymentDate:formVal.lastPaymentDate};
      return payment;
    },
  }));
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformVal((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <TextField
            value={formVal.description}
            label="Açıklama"
            onChange={handleInputChange}
            fullWidth
            id="description"
            name="description"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="lastPaymentDate"
            label="Son Ödeme Tarihi"
            type="date"
            name="lastPaymentDate"
            value={dateFormat(formVal.lastPaymentDate)}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CurrencyTextField
            fullWidth
            label="İlk Bakiye"
            variant="standard"
            currencySymbol="₺"
            outputFormat="string"
            decimalPlaces={2}
            value={setter(info.initialBalance)}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CurrencyTextField
            fullWidth
            label="Ödeme Toplamı"
            variant="standard"
            currencySymbol="₺"
            outputFormat="string"
            decimalPlaces={2}
            value={setter(info.totalSubPayments)}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CurrencyTextField
            fullWidth
            label="Kalan Bakiye"
            variant="standard"
            currencySymbol="₺"
            outputFormat="string"
            decimalPlaces={2}
            value={setter(info.activeBalance)}
            disabled
          />
        </Grid>
      </Grid>
    </div>
  );
})

function PaymentHistory({ list, onSubpaymentDelete, isClosed }) {
  return (
    <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {" "}
            Geçmiş Ödemeler
          </ListSubheader>
        }
      >
        {list.map((item) => {
          let _dt = formatDate(item.createdDate);
          return (
            <ListItem button>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>{item.description}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography>
                    {item.payment}
                    {" ₺"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography>{_dt[0] + " " + _dt[1]}</Typography>
                </Grid>
                <Grid item xs={12} md={1}>
                  {isClosed ? null : (
                    <DeleteIcon  onClick={(e) => {onSubpaymentDelete(item._id);}}/>
                  )}
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

const NewPayment = forwardRef((props, ref) => {
  const formRef = useRef();
  const [curErr, setcurErr] = useState(false);

  useImperativeHandle(ref, () => ({
    SavePayment() {
      if (formRef && formRef.current) {
        let description = formRef.current["description"].value;
        let payment = formRef.current["payment"].value;
        if (payment && payment != "") {
          return { payment, description };
        } else {
          setcurErr(true);
          return {};
        }
      }
    },
  }));

  return (
    <form ref={formRef}>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ display: "none" }}>
          <TextField disabled id="_id" name="_id" value={props._id} />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="description"
            name="description"
            label="Açıklama"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <CurrencyTextField
            label="Ödeme"
            id="payment"
            name="payment"
            variant="standard"
            currencySymbol="₺"
            outputFormat="string"
            decimalPlaces={2}
            error={curErr}
            helperText={curErr ? "Geçerli bir bakiye giriniz" : null}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
});

export default function BalancePaymentDetails({ paymentId, open, onClose }) {
  const newPaymentRef = useRef();
  const infoPaymentRef=useRef();
  const confirm = useConfirm();
  const [pageIndex, setpageIndex] = useState(1);
  const [paymentDetails, setpaymentDetails] = useState({info: {},subPayments: [],});
  function GetDetails(paymentId) {
    GetPaymentDetails(paymentId)
      .then((response) => {
        try {
          if (response.data && response.data.paymentInfo) {
            if (response.data.paymentInfo.length > 0) {
              let paymentResponse = response.data.paymentInfo[0];
              if (paymentResponse.info) {
                setpaymentDetails((prevState) => ({
                  ...prevState,
                  info: paymentResponse.info,
                }));
              }
              if (paymentResponse.subPayments) {
                setpaymentDetails((prevState) => ({
                  ...prevState,
                  subPayments: paymentResponse.subPayments,
                }));
              }
            }
          }
        } catch (e) {}
      })
      .catch((error) => {
        Toast.error("Hata Oluştu");
        onClose();
      });
  }
  useEffect(() => {
    if (paymentId && paymentId !== "") { GetDetails(paymentId);}
  }, [paymentId]);
  const onCancelClick = (e) => {
    if (pageIndex == 1) {
      onClose();
    } else if (pageIndex == 2) {
      setpageIndex(1);
    } else if (pageIndex == 3) {
    }
  };
  const onSaveClick = (e) => {
    if (pageIndex == 1) {
    if(infoPaymentRef && infoPaymentRef.current){
      let payment = infoPaymentRef.current.SavePayment();
       SetPayment(payment)
      .then((result)=>{Toast.success("Ödeme Kaydedildi");GetDetails(paymentId);})
      .catch((error)=>{Toast.error("Hata Oluştu ");console.log(error);})
    }
    } else if (pageIndex == 2) {
      if (newPaymentRef && newPaymentRef.current) {
        let formResult = newPaymentRef.current.SavePayment();
        if (formResult && formResult.payment) {
          formResult.parentId = paymentId;
          AddSubPayment(formResult)
            .then((result) => {Toast.success("Ödeme Kaydedildi");GetDetails(paymentId);})
            .catch((error) => {Toast.error("Hata Oluştu ");console.log(error);});
          setpageIndex(1);
        }
      }
    } else if (pageIndex == 3) {
    }
  };
  const onSubpaymentDelete = (_id) => {
    confirm({ title: "Kaydı Sil", description: "Kaydı silmek istiyor musunuz?", confirmationText: "Tamam", cancellationText: "İptal",})
      .then(() => {
        DeleteSubPayment(_id)
          .then((result) => {Toast.success("Ödeme Silindi");GetDetails(paymentId);})
          .catch((error) => {Toast.error("Hata Oluştu");});
      })
      .catch(() => {});
  };
  const onDeleteClick=(_id)=>{
    confirm({title: "Ödemeyi Sil", description: "Ödemeyi silmek istiyor musunuz?", confirmationText: "Tamam", cancellationText: "İptal",})
      .then(() => {
        DeletePayment(_id)
        .then((result) => {Toast.success("Ödeme Silindi"); GetDetails(paymentId);  onClose();})
        .catch((error) => {Toast.error("Hata Oluştu");});
      })
      .catch(() => {});
  }
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"} disableBackdropClick={true}>
        <DialogTitle id="alert-dialog-title">
          {pageIndex == 1 ? <span>Ödeme Detayları</span> : ""}
          {pageIndex == 2 ? <span>Yeni Ödeme</span> : ""}
        </DialogTitle>
        <DialogContent>
          <div>
            {" "}
            {pageIndex == 1 ? (
              <div>
                <PaymentInfo ref={infoPaymentRef} info={paymentDetails.info} />
                <PaymentHistory list={paymentDetails.subPayments} onSubpaymentDelete={onSubpaymentDelete} isClosed={paymentDetails.info.isClosed}/>
              </div>
            ) : null}
          </div>
          <div>
            {" "}
            {pageIndex == 2 ? (
              <div><NewPayment ref={newPaymentRef} /></div>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          {pageIndex == 1 ? (
            <div>
              {paymentDetails.info.isClosed ? null :<Button onClick={(e) => {setpageIndex(2);}} variant="contained" startIcon={<MonetizationOnOutlinedIcon />} color="#28A745">YENİ ÖDEME</Button>}
              {"  "}
              <Button onClick={(e)=>{onDeleteClick(paymentId)}} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                ÖDEMEYİ SİL
              </Button>
            </div>
          ) : null}
          <Button onClick={onSaveClick} variant="contained" startIcon={<SaveIcon />} color="primary">
            KAYDET
          </Button>
          <Button onClick={onCancelClick} variant="contained" color="secondary" startIcon={<CloseIcon />}>
            İPTAL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
