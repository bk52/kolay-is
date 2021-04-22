import React, { useState, useEffect, useMemo, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "../components/SimpleTable";
import { useConfirm } from "material-ui-confirm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OrderSearch from "../components/CustomerHeader";
import AddIcon from "@material-ui/icons/Add";
import {
  GetProducts,
  GetProduct,
  SetProduct,
  DeleteProduct,
} from "../redux/actions/productsApi";
import dateFormat from "../common/formatDate";
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

const NewOrderModal = ({ handleClose, onOrderSave }) => {
  const [page, setPage] = useState(0);
  useEffect(() => {}, []);
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
      disableBackdropClick={true}
    >
      <DialogContent>
        <Stepper activeStep={page} alternativeLabel>
          <Step key="ordersInfo"><StepLabel>Sipariş Bilgisi</StepLabel></Step>
          <Step key="customerInfo"><StepLabel>Müşteri Bilgisi</StepLabel></Step>
          <Step key="summary"><StepLabel>Özet</StepLabel></Step>
        </Stepper>
         {page==0 && <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <Paper>
                        
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}></Grid>
            </Grid>    
         </div>}
         {page==1 && <div>Customer Info</div>}
         {page==2 && <div>Summary</div>}
      </DialogContent>
    </Dialog>
  );
};

const OrderPage = () => {
  const confirm = useConfirm();
  const [filterText, setfilterText] = useState("");
  const [apiData, setData] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [ready, setReady] = useState(true);
  const fillTable = () => {};
  const addNew = () => {
    setNewModal(true);
  };
  const onRowEdit = (_id) => {};
  const onRowDelete = (_id) => {
    confirm({
      title: "Kaydı Sil",
      description: "Kaydı silmek istiyor musunuz?",
      confirmationText: "Tamam",
      cancellationText: "İptal",
    })
      .then(() => {})
      .catch(() => {});
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
