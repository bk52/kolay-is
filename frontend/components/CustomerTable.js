import React, {useMemo, useRef} from "react";
import {useDispatch} from "react-redux"
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from "./SimpleTable";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import { useConfirm } from 'material-ui-confirm';
import {types} from "../redux/constants/action-types";


  function RatingCell({ value}) {
    let intValue=Math.floor(value);
    return <Rating name="read-only" value={intValue} readOnly />;
  }

export default function CustomerTable({filterText, tableData}) {
    const tableInstance = useRef(null);
    const confirm = useConfirm();
    const dispatch=useDispatch();

    const EditCustomer=(value)=>{
      dispatch({type:types.CUSTOMER_MODAL_OPEN, payload:{loading:true}})
      dispatch({type:types.CUSTOMER_GET, payload:{customerId:value}})
    }

    const DeleteCustomer=(value)=>{
      confirm({title:"Kaydı Sil", description: 'Kaydı silmek istiyor musunuz?', confirmationText:"Tamam", cancellationText:"İptal"})
      .then(() => {  dispatch({type:types.CUSTOMER_DELETE, payload:{_id:value}}) })
      .catch(() => { });
    }

    if(tableInstance && tableInstance.current)
    {
      tableInstance.current.setGlobalFilter(filterText);
    }
    const columns = useMemo(
      () => [
            {
              Header: '',
              accessor: '_id',
              Cell:(props)=>{
                return(
                <div style={{display:"inline-flex"}}> 
                  <IconButton size="small" aria-label="edit" onClick={(e)=>{e.stopPropagation(); EditCustomer(props.value)}}><EditIcon/></IconButton>
                  <IconButton size="small" aria-label="delete" onClick={(e)=>{e.stopPropagation(); DeleteCustomer(props.value)}}><DeleteIcon/></IconButton>
                </div>)
              },      
              disableSortBy:true,
            },
            {
              Header: 'Firma Adı',
              accessor: 'fullName',
            },
            {
              Header: 'Yetkili',
              accessor: 'ownerName',
            },
            {
              Header: 'Telefon',
              accessor: 'tel1',
              disableSortBy:true,
            },
            {
              Header: 'Adres',
              accessor: 'adress',
              disableSortBy:true,
            },
            {
              Header: 'İlçe',
              accessor: 'townName.name',
            },
            {
              Header: 'İl',
              accessor: 'cityName.name',
            },
            {
              Header: 'Puanı',
              accessor: 'rate',
              Cell: RatingCell,
            },
      ],
      []
    )
   // const data = React.useMemo(() => [tableData], [])
    return (
      <div>
        <CssBaseline />
        <Table columns={columns} data={tableData} ref={tableInstance}/>
      </div>
    )
  }


  