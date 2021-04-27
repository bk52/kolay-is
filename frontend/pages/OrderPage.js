import React, { useState, useEffect} from "react";
import { useConfirm } from "material-ui-confirm";
import OrderSearch from "../components/CustomerHeader";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toast from "../components/Snackbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import OrderModalInfo from "../components/OrderModalInfo";
import OrderModalCustomer from "../components/OrderModalCustomer";
import OrderModalDetails from "../components/OrderModalDetails";
import OrderTable from "../components/OrderTable";

const NewOrderModal = ({ handleClose, onOrderSave }) => {
  const [page, setPage] = useState(0);
  const handleNext = () => {
    setPage((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {setPage((prevActiveStep) => prevActiveStep - 1);};
  const [orderForm, setOrderForm]=useState({orderList:[], orderStats:{net:0, tax:0, total:0, discount:0}});
  const onValueChanged=(name,value)=>{setOrderForm((prevState) => ({...prevState,[name]: value,}));}
  const discountChanged=(e)=>{
    const {value}=e.target;
    if(value && value!==""){
       let orderStats=orderForm.orderStats;
       let net=orderStats.total+orderStats.tax-value;
       let stats={...orderStats, net:net, discount:value};
       onValueChanged("orderStats",stats);
    }  
  }
  const UpdateStats =()=>{
    let orderList=orderForm.orderList;
    let orderStats=orderForm.orderStats;
    let total=0,tax=0,net=0;
    for(let i=0;i<orderList.length;i++){total+=orderList[i].totalPrice}
    tax=total*0.18;
    net=total+tax-orderStats.discount;
    let stats={total,net,tax, discount:orderStats.discount};
    onValueChanged("orderStats",stats);
  }
  const AddProductList=(order)=>{
    delete order["_id"];
    let orderList=orderForm.orderList, newIndex=0;
    if(orderList && orderList.length>0){
      orderList.sort((a,b) => (a.index > b.index) ? -1 : ((b.index > a.index) ? 1 : 0));
      newIndex=orderList[0].index+1
    }
    order.index=newIndex;
    orderList.push(order);
    onValueChanged("orderList",orderList);
  }
  useEffect(()=>{UpdateStats();},[orderForm.orderList.length])
  const RemoveProductList=(index)=>{
    let orderList=orderForm.orderList;
    for(let i=0;i<orderList.length;i++){
      if(orderList[i].index==index){
        orderList.splice(i,1);
        break;
      }
    }
    onValueChanged("orderList",orderList);
  }
  useEffect(() => { 
    let _deliveryDate = new Date();
    _deliveryDate.setDate(_deliveryDate.getDate() + 7);
    onValueChanged("deliveryDate",_deliveryDate);
  }, []);
  return (
    <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth={"md"} disableBackdropClick={true}>
      <DialogTitle>Yeni Sipariş</DialogTitle>
      <DialogContent>
        <Stepper activeStep={page} alternativeLabel>
          <Step key="ordersInfo"><StepLabel>Sipariş Bilgisi</StepLabel></Step>
          <Step key="customerInfo"><StepLabel>Müşteri Bilgisi</StepLabel></Step>
          <Step key="details"><StepLabel>Sipariş Detayları</StepLabel></Step>
        </Stepper>
        {page == 0 && <OrderModalInfo discountChanged={discountChanged} orderStats={orderForm.orderStats} orderList={orderForm.orderList} addOrder={AddProductList} removeOrder={RemoveProductList}/>}
        {page == 1 && <OrderModalCustomer/>}
        {page == 2 && <OrderModalDetails order={orderForm}/>}
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1} style={{ paddingRight: 14 }}>
          <Grid item xs={2}><Button disabled={page == 0} onClick={handleBack} color="primary"><ArrowBackIosIcon />{" "}</Button><Button disabled={page == 2} onClick={handleNext} color="primary"><ArrowForwardIosIcon /></Button></Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={2} style={{ textAlign: "right" }}> <Button onClick={null} variant="contained" color="secondary" startIcon={<CloseIcon />}>İPTAL</Button></Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

const OrderPage = () => {
  const confirm = useConfirm();
  const [filterText, setfilterText] = useState("");
  const [apiData, setData] = useState([]);
  const [newModal, setNewModal] = useState(true);
  const [ready, setReady] = useState(true);
  const fillTable = () => { };
  const addNew = () => {
    setNewModal(true);
  };
  const onRowEdit = (_id) => { };
  const onRowDelete = (_id) => {
    confirm({
      title: "Kaydı Sil",
      description: "Kaydı silmek istiyor musunuz?",
      confirmationText: "Tamam",
      cancellationText: "İptal",
    })
      .then(() => { })
      .catch(() => { });
  };
  const onOrderSave = (success) => {
    if (success) {
      fillTable();
      setOrderModal({ _id: "", open: false });
      Toast.success("Kaydedildi");
    } else {
      Toast.error("Hata Oluştu");
    }
  };
  const closeNewModal = () => {
    fillTable();
    setNewModal(false);
  };
  const textChanged = (e) => {
    const val = e.target.value || "";
    setfilterText(val);
  };
  useEffect(() => {
    fillTable();
  }, []);
  return (
    <div>
      {ready ? (
        <div>
          <OrderSearch
            textChanged={textChanged}
            buttonClick={addNew}
            textLabel={"Siparişlerde Ara"}
            buttonIcon={<AddIcon />}
            buttonTooltip={"Yeni Sipariş"}
          />
          <OrderTable
            filterText={filterText}
            tableData={apiData}
            onRowEdit={onRowEdit}
            onRowDelete={onRowDelete}
          />
          {newModal ? (
            <NewOrderModal
              open={true}
              handleClose={closeNewModal}
              onOrderSave={onOrderSave}
            ></NewOrderModal>
          ) : null}
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default OrderPage;
