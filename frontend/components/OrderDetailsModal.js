import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
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

const OrderDetailsModal = ({ handleClose, orderId}) => {
    const [isLoading, setLoading] = useState(false);
    const onValueChanged = (name, value) => { setOrderForm((prevState) => ({ ...prevState, [name]: value, })); }
    const SaveDetails=()=>{

    }
    useEffect(() => {

    }, []);

    return (
        <Dialog open={true} fullWidth={true} maxWidth={"md"} disableBackdropClick={true}>
            <DialogTitle>Sipariş Detayları</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e)=>SaveDetails()} variant="contained" startIcon={<SaveIcon />} color="primary">KAYDET</Button>
                <Button onClick={handleClose} variant="contained" color="secondary" startIcon={<CloseIcon />} >İPTAL</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetailsModal