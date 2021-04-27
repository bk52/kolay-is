import React, {useMemo, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "./SimpleTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import dateFormat from "../common/formatDate";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import Chip from "@material-ui/core/Chip";


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

  export default OrderTable;