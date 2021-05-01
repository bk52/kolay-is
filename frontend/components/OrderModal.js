import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toast from "./Snackbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import OrderModalInfo from "./OrderModalInfo";
import OrderModalCustomer from "./OrderModalCustomer";
import OrderModalDetails from "./OrderModalDetails";
import LinearProgress from "@material-ui/core/LinearProgress";
import { SetOrder } from "../redux/actions/ordersApi";

const OrderModal = ({ handleClose }) => {
    const [page, setPage] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const handleNext = () => {
        setPage((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => { setPage((prevActiveStep) => prevActiveStep - 1); };
    const [orderForm, setOrderForm] = useState({
        orderList: [],
        orderStats: { net: 0, tax: 0, total: 0, discount: 0 },
        customer: { _id: "", fullName: "" },
        note: "",
        prepayment: 0,
        urgent: false
    });
    const onValueChanged = (name, value) => { setOrderForm((prevState) => ({ ...prevState, [name]: value, })); }
    const discountChanged = (e) => {
        const { value } = e.target;
        if (value && value !== "") {
            let orderStats = orderForm.orderStats;
            let net = orderStats.total + orderStats.tax - value;
            let stats = { ...orderStats, net: net, discount: value };
            onValueChanged("orderStats", stats);
        }
    }
    const UpdateStats = () => {
        let orderList = orderForm.orderList;
        let orderStats = orderForm.orderStats;
        let total = 0, tax = 0, net = 0;
        for (let i = 0; i < orderList.length; i++) { total += orderList[i].totalPrice }
        tax = total * 0.18;
        net = total + tax - orderStats.discount;
        let stats = { total, net, tax, discount: orderStats.discount };
        onValueChanged("orderStats", stats);
    }
    const AddProductList = (order) => {
        delete order["_id"];
        let orderList = orderForm.orderList, newIndex = 0;
        if (orderList && orderList.length > 0) {
            orderList.sort((a, b) => (a.index > b.index) ? -1 : ((b.index > a.index) ? 1 : 0));
            newIndex = orderList[0].index + 1
        }
        order.index = newIndex;
        orderList.push(order);
        onValueChanged("orderList", orderList);
    }
    const RemoveProductList = (index) => {
        let orderList = orderForm.orderList;
        for (let i = 0; i < orderList.length; i++) {
            if (orderList[i].index == index) {
                orderList.splice(i, 1);
                break;
            }
        }
        onValueChanged("orderList", orderList);
    }
    useEffect(() => {
        let _deliveryDate = new Date();
        _deliveryDate.setDate(_deliveryDate.getDate() + 7);
        onValueChanged("deliveryDate", _deliveryDate);
    }, []);
    useEffect(() => { UpdateStats(); }, [orderForm.orderList.length])
    const SaveOrder = () => {
        if (orderForm.customer._id == "") {
            Toast.warning("Müşteri Seçiniz"); return;
        }
        if (orderForm.orderList.length == 0) {
            Toast.warning("Ürün Seçiniz"); return;
        }
        setLoading(true);
        let order={...orderForm};
        order.customerId=orderForm.customer._id;
        delete order["customer"];
        SetOrder(order)
        .then((result)=>{Toast.success("Sipariş Kaydedildi");handleClose();})
        .catch((error)=>{Toast.error("Hata Oluştu"); console.log(error); setLoading(false)})
    }
    return (
        <Dialog open={true} fullWidth={true} maxWidth={"md"} disableBackdropClick={true}>
            <DialogTitle>Yeni Sipariş</DialogTitle>
            <DialogContent>
                <Stepper activeStep={page} alternativeLabel>
                    <Step key="ordersInfo"><StepLabel>Sipariş Bilgisi</StepLabel></Step>
                    <Step key="customerInfo"><StepLabel>Müşteri Bilgisi</StepLabel></Step>
                    <Step key="details"><StepLabel>Sipariş Detayları</StepLabel></Step>
                </Stepper>
                {isLoading ? <LinearProgress /> :
                    <React.Fragment>
                        {page == 0 && <OrderModalInfo discountChanged={discountChanged} orderStats={orderForm.orderStats} orderList={orderForm.orderList} addOrder={AddProductList} removeOrder={RemoveProductList} />}
                        {page == 1 && <OrderModalCustomer onValueChanged={onValueChanged} />}
                        {page == 2 && <OrderModalDetails order={orderForm} onValueChanged={onValueChanged} SaveOrder={SaveOrder} />}
                    </React.Fragment>
                }
            </DialogContent>
            <DialogActions>
                <Grid container spacing={1} style={{ paddingRight: 14 }}>
                    <Grid item xs={2}><Button disabled={page == 0} onClick={handleBack} color="primary"><ArrowBackIosIcon />{" "}</Button><Button disabled={page == 2} onClick={handleNext} color="primary"><ArrowForwardIosIcon /></Button></Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={2} style={{ textAlign: "right" }}> <Button onClick={() => handleClose()} variant="contained" color="secondary" startIcon={<CloseIcon />}>İPTAL</Button></Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default OrderModal