import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import datePickerFormat from "../common/datepickerFormat";
import { OrderStatus } from "../common/commonTypes";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { GetOrder,SetOrder } from "../redux/actions/ordersApi";
import Toast from "./Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";

const OrderEditModal = ({ handleClose, orderId }) => {
    const [isLoading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const [orderForm, setOrderForm] = useState({
        orderBalance: { net: 0, tax: 0, total: 0, discount: 0, prepayment:0 },
        note: "",
        urgent: false,
        orderStatus: 0,
    });
    const discountChanged = (e) => {
        const { value } = e.target;
        if (value && value !== "") {
            let orderBalance = orderForm.orderBalance;
            let net = orderBalance.total + orderBalance.tax - value - orderBalance.prepayment;
            let stats = { ...orderBalance, net: net, discount: value };
            onValueChanged("orderBalance", stats);
        }
    }
    const prepaymentChanged=(e)=>{
        const { value } = e.target;
        if (value && value !== "") {
            let orderBalance = orderForm.orderBalance;
            let net = orderBalance.total + orderBalance.tax - value - orderBalance.discount;
            let stats = { ...orderBalance, net: net, prepayment: value };
            onValueChanged("orderBalance", stats);
        }
    }
    const onValueChanged = (name, value) => { setOrderForm((prevState) => ({ ...prevState, [name]: value, })); }
    const SaveDetails = () => {
        if(orderForm._id && orderForm._id!==""){
            let order={...orderForm};
            SetOrder(order)
            .then((res)=>{
                Toast.success("Kayıt Güncellendi");
                handleClose();
            })
            .catch((err)=>{Toast.error("Hata Oluştu")})
        }
    }
    useEffect(() => {
        if (orderId) {
            GetOrder(orderId)
                .then((data) => {
                    if (data && data.result) {
                        setOrderForm({
                            _id:orderId,
                            orderStatus:data.result.orderStatus,
                            orderBalance:{
                                total:parseFloat(data.result.orderBalance.total["$numberDecimal"]),
                                net:parseFloat(data.result.orderBalance.net["$numberDecimal"]),
                                tax:parseFloat(data.result.orderBalance.tax["$numberDecimal"]),
                                discount:parseFloat(data.result.orderBalance.discount["$numberDecimal"]),
                                prepayment:parseFloat(data.result.orderBalance.prepayment["$numberDecimal"])
                            },
                            note:data.result.note,
                            urgent:data.result.urgent,
                            deliveryDate:data.result.deliveryDate
                        })
                    }
                    setReady(true);
                })
                .catch((error) => {
                    console.log(error);
                    Toast.error("Hata Oluştu");
                    handleClose();
                })
        }
    }, []);

    return (
        <Dialog open={true} fullWidth={true} maxWidth={"md"} disableBackdropClick={true}>
            <DialogTitle>Sipariş Detayları</DialogTitle>
            <DialogContent>
                {ready ? <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Grid item xs={12}><CurrencyTextField disabled label="Toplam" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={orderForm.orderBalance.total} /></Grid>
                        <Grid item xs={12}><CurrencyTextField disabled label="KDV %18" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={orderForm.orderBalance.tax} /></Grid>
                        <Grid item xs={12}><CurrencyTextField label="İskonto" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} onChange={discountChanged} value={orderForm.orderBalance.discount} /></Grid>
                        <Grid item xs={12}><CurrencyTextField label="Ön Ödeme" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} onChange={prepaymentChanged} value={orderForm.orderBalance.prepayment} /></Grid>
                        <Grid item xs={12}><CurrencyTextField disabled label="Genel Toplam" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={orderForm.orderBalance.net} /></Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid item xs={12}><TextField id="notes" name="notes" label="Sipariş Notu" value={orderForm.note} onChange={(e) => { onValueChanged("note", e.target.value) }} fullWidth /></Grid>
                        <Grid item xs={12}><TextField fullWidth id="deliveryDate" label="Teslim Tarihi" type="date" name="deliveryDate" value={datePickerFormat(orderForm.deliveryDate)} InputLabelProps={{ shrink: true }} onChange={(e) => { onValueChanged("deliveryDate", e.target.value) }} /></Grid>
                        <Grid container xs={12}>
                            <Grid item xs={6} style={{ marginTop: 10, textAlign: "center" }}>
                                Acil Sipariş {" "}<Checkbox checked={orderForm.urgent} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} onChange={(e) => { onValueChanged("urgent", !orderForm.urgent) }} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel fullWidth id="orderStatus">Durum</InputLabel>
                                    <Select fullWidth labelId="orderStatus" id="orderStatus" value={orderForm.orderStatus} onChange={(e) => { onValueChanged("orderStatus", e.target.value) }}>
                                        <MenuItem value={OrderStatus.ORDER_TAKEN.val}>{OrderStatus.ORDER_TAKEN.title}</MenuItem>
                                        <MenuItem value={OrderStatus.ORDER_PRINTING.val}>{OrderStatus.ORDER_PRINTING.title}</MenuItem>
                                        <MenuItem value={OrderStatus.ORDER_COMPLETED.val}>{OrderStatus.ORDER_COMPLETED.title}</MenuItem>
                                        <MenuItem value={OrderStatus.ORDER_DELIVERED.val}>{OrderStatus.ORDER_DELIVERED.title}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> : <LinearProgress />}

            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => SaveDetails()} variant="contained" startIcon={<SaveIcon />} color="primary">KAYDET</Button>
                <Button onClick={handleClose} variant="contained" color="secondary" startIcon={<CloseIcon />} >İPTAL</Button>
            </DialogActions>
        </Dialog >
    );
};

export default OrderEditModal