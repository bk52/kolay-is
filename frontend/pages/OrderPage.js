import React, { useState, useEffect, useMemo, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "../components/SimpleTable";
import { useConfirm } from "material-ui-confirm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OrderSearch from "../components/CustomerHeader";
import AddIcon from "@material-ui/icons/Add";
import dateFormat from "../common/formatDate";
import datePickerFormat from "../common/datepickerFormat";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toast from "../components/Snackbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import ProductList from "../components/ProductList";
import CustomerList from "../components/AutoComplete";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Switch from '@material-ui/core/Switch';
import CustomerSearch from "../components/AutoComplete";
import PhoneField from "../components/PhoneField";
import Checkbox from '@material-ui/core/Checkbox';

const OrderStatusCell = ({ value }) => {
  let res = null;
  if (value == 0) {
    res = <Chip label="Sipariş Alındı" />;
  } else if (value == 20) {
    res = <Chip color="primary" label="Baskıda" />;
  } else if (value == 100) {
    res = (
      <Chip
        style={{ backgroundColor: "#28A745", color: "white" }}
        label="Hazır"
      />
    );
  }
  return res;
};

const OrderTable = ({ filterText, tableData, onRowEdit, onRowDelete }) => {
  const tableInstance = useRef(null);
  const Edit = (value) => {
    onRowEdit(value);
  };
  const Delete = (value) => {
    onRowDelete(value);
  };
  if (tableInstance && tableInstance.current) {
    tableInstance.current.setGlobalFilter(filterText);
  }
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "_id",
        Cell: (props) => {
          return (
            <div style={{ display: "inline-flex" }}>
              <IconButton
                size="small"
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  Edit(props.value);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  Delete(props.value);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        },
        disableSortBy: true,
      },
      {
        Header: "Müşteri",
        accessor: "customerName",
        disableSortBy: true,
      },
      {
        Header: "Telefon",
        accessor: "phone",
        disableSortBy: true,
      },
      {
        Header: "Siparişler",
        accessor: "order",
        disableSortBy: true,
        //   Cell: (props) => { return (<div>{props.value + " ₺"}</div>);},
      },
      {
        Header: "Acil",
        accessor: "immediate",
        disableSortBy: true,
        Cell: (props) => {
          return (
            <div>
              {props.value ? (
                <PriorityHighIcon style={{ color: "red" }} />
              ) : null}
            </div>
          );
        },
      },
      {
        Header: "Durum",
        accessor: "orderStatus",
        disableSortBy: true,
        Cell: OrderStatusCell,
      },
      {
        Header: "Sipariş Notu",
        accessor: "orderNote",
        disableSortBy: true,
        Cell: (props) => {
          return <div>{props.value ? <CommentOutlinedIcon /> : null}</div>;
        },
      },
      {
        Header: "Oluşturma Tarihi",
        accessor: "createdDate",
        disableSortBy: true,
        Cell: (props) => {
          let dateArr = dateFormat(props.value);
          return <div>{dateArr[0] + " " + dateArr[1]}</div>;
        },
      },
      {
        Header: "Teslim Tarihi",
        accessor: "deliveryDate",
        disableSortBy: true,
        Cell: (props) => {
          let dateArr = dateFormat(props.value);
          return <div>{dateArr[0] + " " + dateArr[1]}</div>;
        },
      },
    ],
    []
  );
  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={tableData} ref={tableInstance} />
    </div>
  );
};

const TestList = [
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
  { _id: 1, productName: "Kaşe", productUnit: "Adet", unitPrice: 10, orderCount: 5, totalSum: 50 },
]

const OrderProductList = ({ list }) => {
  return (
    <List >
      <ListItem>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>Ürün Adı</Grid>
        <Grid item xs={2}>Birim</Grid>
        <Grid item xs={2}>Birim Fiyat</Grid>
        <Grid item xs={2}>Adet</Grid>
        <Grid item xs={2}>Toplam</Grid>
      </ListItem>
      <div style={{ maxHeight: 150, overflowY: "scroll" }}>
        {
          list.map((item) => {
            return <ListItem>
              <Grid item xs={1}><IconButton size="small" aria-label="edit" onClick={(e) => { }}><DeleteIcon /></IconButton></Grid>
              <Grid item xs={3}>{item.productName}</Grid>
              <Grid item xs={2}>{item.productUnit}</Grid>
              <Grid item xs={2}>{item.unitPrice} ₺</Grid>
              <Grid item xs={2}>{item.orderCount}</Grid>
              <Grid item xs={2}>{item.totalSum} ₺</Grid>
            </ListItem>
          })
        }
      </div>
    </List>
  )
}

const NewOrderModal = ({ handleClose, onOrderSave }) => {
  const [page, setPage] = useState(0);
  const [newCustomer,setNewCustomer]=useState(false);
  const [nameError,setNameError]=useState(false);
  const [orderForm, setOrderForm]=useState({});
  const onProductSelected = (e) => {
    console.log(e);
  }
  const onCustomerSelected=(e)=>{
    console.log(e);
  }
  const handleNext = () => { setPage((prevActiveStep) => prevActiveStep + 1); };
  const handleBack = () => { setPage((prevActiveStep) => prevActiveStep - 1); };
  const SaveProduct = () => { }
  const CancelProduct = () => { }
  const RemoveProduct = () => { }
  const SaveCustomer=()=>{}
  const onValueChanged=(name,value)=>{setOrderForm((prevState) => ({...prevState,[name]: value,}));}
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
        {page == 0 && <div>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Paper>
                <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8 }}>
                  <Grid item xs={4} style={{ marginTop: 20 }}>Ürün</Grid><Grid item xs={8}><ProductList selectedChanged={onProductSelected} /></Grid>
                  <Grid item xs={4}>Birim</Grid><Grid item xs={8}><TextField fullWidth disabled value="Birim" inputProps={{ style: { textAlign: 'right' } }} /></Grid>
                  <Grid item xs={4}>Birim Fiyat</Grid><Grid item xs={8}><CurrencyTextField fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} disabled /></Grid>
                  <Grid item xs={4}>Adet</Grid><Grid item xs={8}><TextField fullWidth type="number" inputProps={{ min: 1, style: { textAlign: 'right' } }} /></Grid>
                  <Grid item xs={4}>Toplam</Grid><Grid item xs={8}><CurrencyTextField fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} disabled /></Grid>
                  <Grid item xs={12} style={{ textAlign: "right" }}>
                    <Button onClick={SaveProduct} startIcon={<SaveIcon />} color="primary">KAYDET</Button>{" "}
                    <Button onClick={CancelProduct} color="secondary" startIcon={<CloseIcon />}>İPTAL</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper>
                <OrderProductList list={TestList} />
                <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8 }}>
                  <Grid item xs={3}><CurrencyTextField label="Toplam" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} disabled /></Grid>
                  <Grid item xs={3}><CurrencyTextField label="KDV %8" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} disabled /></Grid>
                  <Grid item xs={3}><CurrencyTextField label="İskonto" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} /></Grid>
                  <Grid item xs={3}><CurrencyTextField label="Net" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} disabled /></Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>}
        {page == 1 && <div>
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
          </Grid>
        </div>}
        {page == 2 && <div>
          <Grid container spacing={1}>
            <Grid item xs={12}><TextField id="notes" name="notes" label="Sipariş Not" fullWidth/></Grid>
            <Grid item xs={4}>
             <TextField fullWidth id="deliveryDate" label="Teslim Tarihi" type="date" name="deliveryDate" value={datePickerFormat(orderForm.deliveryDate)} InputLabelProps={{ shrink: true }} onChange={(e)=>{onValueChanged("deliveryDate",e.target.value)}}/>
            </Grid>
            <Grid item xs={4}>
              <CurrencyTextField label="Ön Ödeme" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={10} />
            </Grid>
            <Grid item xs={4} style={{marginTop:10,textAlign:"center"}}>
               Acil Sipariş {" "}<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}/>
            </Grid>
            <Grid item xs={12}><Button fullWidth onClick={null} variant="contained" startIcon={<SaveIcon />} color="primary">SİPARİŞ OLUŞTUR</Button></Grid>
          </Grid>
        </div>}
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
  const [newModal, setNewModal] = useState(false);
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
