import React, { useState, useEffect, useMemo, forwardRef, useRef, useImperativeHandle, } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import CssBaseline from '@material-ui/core/CssBaseline'
import Table from "./SimpleTable";

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1 },
    modal: { padding: theme.spacing(0) },
    title: {
      backgroundColor: "#3F51B5",
      color: "white",
    },
  }));

const CaseActiveDialog=({ open, onClose, balanceType })=>{
    const classes = useStyles();
    const tableInstance = useRef(null);
    const columns = useMemo(
      () => [
            {
              Header: 'Firma Adı',
              accessor: 'fullName',
              disableSortBy:true,
            },
            {
              Header: 'Açıklama',
              accessor: 'description',
              disableSortBy:true,
            },
            {
              Header: 'İlk Bakiye',
              accessor: 'initialBalance',
              disableSortBy:true,
            },
            {
              Header: 'Kalan Bakiye',
              accessor: 'activeBalance',
              disableSortBy:true,
            },
            {
              Header: 'Son Ödeme Tarihi',
              accessor: 'lastPaymentDate',
            },
            {
              Header: '',
              accessor: '_id',
              Cell:(props)=>{
                return(
                <div style={{display:"inline-flex"}}> 
                  <IconButton size="small" aria-label="edit" onClick={(e)=>{e.stopPropagation();}}><ArrowForwardIosIcon/></IconButton>
                </div>)
              },      
              disableSortBy:true,
            },
  
      ],
      []
    )
    return( <Dialog open={open} fullWidth={true} maxWidth={"md"} disableBackdropClick={true}>
    <DialogTitle className={classes.title}>{balanceType==1 ? "Aktif Tahsilatlar" : "Aktif Borçlar"}</DialogTitle>
    <DialogContent>
     <div>
        <CssBaseline />
        <Table columns={columns} data={[]} ref={tableInstance}/>
      </div>
    </DialogContent>
    <DialogActions><Button onClick={onClose} variant="contained" color="secondary" startIcon={<CloseIcon />}>İPTAL</Button></DialogActions>
  </Dialog>)
}

export default CaseActiveDialog;