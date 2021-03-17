import React, { useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "./SimpleTable";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useConfirm } from "material-ui-confirm";
import { types } from "../redux/constants/action-types";
import dateFormat from "../common/formatDate";
// function RatingCell({ value}) {
//   let intValue=Math.floor(value);
//   return <Rating name="read-only" value={intValue} readOnly />;
// }

export default function PaymentsTable({ filterText, tableData, detailsClick }) {
  const tableInstance = useRef(null);
  const confirm = useConfirm();
  const dispatch = useDispatch();

  // const showDetails=()=>{

  // }

  const EditCustomer = (value) => {
    // dispatch({type:types.CUSTOMER_MODAL_OPEN, payload:{loading:true}})
    // dispatch({type:types.CUSTOMER_GET, payload:{customerId:value}})
  };

  const DeleteCustomer = (value) => {
    // confirm({title:"Kaydı Sil", description: 'Kaydı silmek istiyor musunuz?', confirmationText:"Tamam", cancellationText:"İptal"})
    // .then(() => {  dispatch({type:types.CUSTOMER_DELETE, payload:{_id:value}}) })
    // .catch(() => { });
  };

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
        Header: "İlk Bakiye",
        accessor: "initialBalance",
      },
      {
        Header: "Kalan Bakiye",
        accessor: "activeBalance",
      },
      {
        Header: "Son Tarih",
        accessor: "lastPaymentDate",
        Cell: (props) => {
          let dateArr = dateFormat(props.value);
          return (
            <div>
              <div>{dateArr[0]}</div>
              <div>{dateArr[1]}</div>
            </div>
          );
        },
      },
      {
        Header: "Oluşturma Tarihi",
        accessor: "createdDate",
        Cell: (props) => {
          let dateArr = dateFormat(props.value);
          return (
            <div>
              <div>{dateArr[0]}</div>
              <div>{dateArr[1]}</div>
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
  // const data = React.useMemo(() => [tableData], [])
  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={tableData} ref={tableInstance} />
    </div>
  );
}

