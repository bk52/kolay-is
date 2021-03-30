import React, { useMemo, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "./SimpleTable";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import dateFormat from "../common/formatDate";

export default function PaymentsTable({ filterText, tableData, detailsClick }) {
  const tableInstance = useRef(null);


  if (tableInstance && tableInstance.current) {
    tableInstance.current.setGlobalFilter(filterText);
  }
  const columns = useMemo(
    () => [
      {
        Header: "Açıklama",
        accessor: "description",
        disableSortBy: true,
      },
      {
        Header: "İlk Bakiye (₺)",
        accessor: "initialBalance",
      },
      {
        Header: "Kalan Bakiye (₺)",
        accessor: "activeBalance",
      },
      {
        Header: "Son Tarih",
        accessor: "lastPaymentDate",
        Cell: (props) => {
          let dateArr = dateFormat(props.value);
          return (<div>{dateArr[0]}</div>);
        },
      },
      {
        Header: "Oluşturma Tarihi",
        accessor: "createdDate",
        Cell: (props) => {
          let dateArr = dateFormat(props.value);
          return (
            <div style={{ display: "inline-flex" }}>
              <div>{dateArr[0] + " " + dateArr[1]}</div>
            </div>
          );
        },
      },
      {
        Header: "",
        accessor: "_id",
        Cell: (props) => {
          return (
            <div style={{ display: "inline-flex" }}>
              <IconButton size="small" aria-label="edit" onClick={(e)=>{e.stopPropagation();detailsClick(props.value)}}><ArrowForwardIosIcon/></IconButton>
            </div>
          );
        },
        disableSortBy: true,
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
}

