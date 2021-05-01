import React, { useMemo, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "./SimpleTable";
import VisibilityIcon from '@material-ui/icons/Visibility';
import dateFormat from "../common/formatDate";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import {OrderStatus} from "../common/commonTypes";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const OrderStatusCell = ({ value }) => {
  let res = null;
  if (value == OrderStatus.ORDER_TAKEN) {
    res = <Chip label="Sipariş Alındı" />;
  } else if (value == OrderStatus.ORDER_PRINTING) {
    res = <Chip color="primary" label="Baskıda" />;
  } else if (value == OrderStatus.ORDER_COMPLETED) {
    res = <Chip style={{ backgroundColor: "#28A745", color: "white" }} label="Hazır"/>
  }
  return res;
};

const OrderListCell = ({ value }) => {
  let res = null;
  if(value && value.length>0){
    return <Paper><Grid container spacing={1}>
      {
          value.map(item=>{
            return <React.Fragment>
                <Grid item xs={6}>{item.productName}</Grid>
                <Grid item xs={3}>{item.orderCount}</Grid>
                <Grid item xs={3}>{item.productUnit}</Grid>
            </React.Fragment>
          })
      }
    </Grid></Paper>
  }
  return res;
};

const OrderTable = ({ filterText, tableData, onShowDetails }) => {
  const tableInstance = useRef(null);
  const ShowDetails = (value) => {
    onShowDetails(value);
  };
  if (tableInstance && tableInstance.current) {
    tableInstance.current.setGlobalFilter(filterText);
  }
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "_id",
        width: 50,
        Cell: (props) => {
          return (
            <IconButton
              size="small"
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                ShowDetails(props.value);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          );
        },
        disableSortBy: true,
      },
      {
        Header: "Müşteri",
        accessor: "customer.fullName",
        disableSortBy: true,
      },
      {
        Header: "Telefon",
        accessor: "customer.tel1",
        disableSortBy: true,
      },
      {
        Header: "Siparişler",
        accessor: "orderList",
        disableSortBy: true,
        width: 300,
        Cell: OrderListCell,
      },
      {
        Header: "Acil",
        accessor: "urgent",
        disableSortBy: true,
        width: 50,
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
          return <div>{dateArr[0]}</div>;
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

export default OrderTable;