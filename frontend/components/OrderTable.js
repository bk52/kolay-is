import React, { useMemo, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import CTable from "./SimpleCollapsibleTable";
import EditIcon from "@material-ui/icons/Edit";
import dateFormat from "../common/formatDate";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import {OrderStatus} from "../common/commonTypes";
import Chip from "@material-ui/core/Chip";

const OrderStatusCell = ({ value }) => {
  let res = null;
  if (value == OrderStatus.ORDER_TAKEN.val) {
    res = <Chip label={OrderStatus.ORDER_TAKEN.title} />;
  } else if (value == OrderStatus.ORDER_PRINTING.val) {
    res = <Chip color="primary" label={OrderStatus.ORDER_PRINTING.title} />;
  } else if (value == OrderStatus.ORDER_COMPLETED.val){
    res = <Chip style={{ backgroundColor: "#28A745", color: "white" }} label={OrderStatus.ORDER_COMPLETED.title}/>
  }
  else if (value == OrderStatus.ORDER_DELIVERED.val){
    res = <Chip style={{ backgroundColor: "#28A745", color: "white" }} label={OrderStatus.ORDER_DELIVERED.title}/>
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
              <EditIcon />
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
        collapsible:true,
        subTable:[
          {title:"", field:"_id", key:true},
          {title:"Ürün", field:"productName"},
          {title:"Adet", field:"orderCount"},
          {title:"Birim", field:"productUnit"},
          {title:"Birim Fiyat", field:"unitPrice", type:"Decimal"},
          {title:"Toplam Fiyat", field:"totalPrice", type:"Decimal"},
        ]
      },
      {
        Header: "Toplam",
        accessor: "orderBalance",
        disableSortBy: true,
        tableSum:true,
        subTable:[
          {title:"Toplam", field:"total", type:"Decimal"},
          {title:"KDV %18", field:"tax", type:"Decimal"},
          {title:"İskonto", field:"discount", type:"Decimal"},
          {title:"Ön Ödeme", field:"prepayment", type:"Decimal"},
          {title:"Genel Toplam", field:"net", type:"Decimal"},
        ]
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
      {/* <Table columns={columns} data={tableData} ref={tableInstance} /> */}
      <CTable columns={columns} data={tableData} ref={tableInstance}/>
    </div>
  );
};

export default OrderTable;