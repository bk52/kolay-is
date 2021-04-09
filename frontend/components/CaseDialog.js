import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import UpIcon from "@material-ui/icons/ExpandLessOutlined";
import DownIcon from "@material-ui/icons/ExpandMoreOutlined";
import TextField from "@material-ui/core/TextField";
import dateFormat from "../common/datepickerFormat";
import formatDate from "../common/formatDate";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  modal: { padding: theme.spacing(0) },
  title: {
    backgroundColor: "#3F51B5",
    color: "white",
  },
  money: {
    textAlign: "center",
    backgroundColor: "#3F51B5",
    color: "white",
    padding: "2px",
  },
}));

const _list=[
    {_id:"1", paymentType:1, description:"desp-a", company:"company-a", price:"10.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"2", paymentType:2, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"3", paymentType:2, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"4", paymentType:2, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"5", paymentType:2, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"6", paymentType:1, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"7", paymentType:1, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"8", paymentType:1, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"},
    {_id:"9", paymentType:1, description:"desp-b", company:"company-b", price:"15.00", createdDate:"08/04/2021 08:30:00"}
]

function PaymentList({list}){
    return( 
        <Paper>
            <Typography variant="overline">Kasa İşlemleri</Typography>
            <List component="nav" aria-labelledby="nested-list-subheader" style={{height:"200px", overflowY:"scroll"}}>
            {list.map((item) => {
             let _dt = formatDate(item.createdDate);
            return (
                <ListItem button>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={1}>{item.paymentType==1 ? <UpIcon style={{color:"#28A745"}}/>:<DownIcon style={{color:"#DC3545"}}/>}</Grid>
                        <Grid item xs={12} md={3}>{item.description}</Grid>
                        <Grid item xs={12} md={3}>{item.company}</Grid>
                        <Grid item xs={12} md={2}>{item.price + " ₺"}</Grid>
                        <Grid item xs={12} md={2}>{_dt[0] + " " + _dt[1]}</Grid>
                    </Grid>
                </ListItem>
            );
            })}
            </List>
        </Paper>
    )
}

function MainPage({paymentList}) {
  const classes = useStyles();
  const [sdate,setsDate]=useState(new Date());
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setsDate(value)
  };
  useEffect(() => {
    setsDate(dateFormat(new Date()))
  }, []);
  return (
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.money}>
            65874.50 ₺
          </Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField 
            fullWidth 
            id="startDate" 
            type="date"
            name="startDate" 
            value={sdate}
            InputLabelProps={{ shrink: true }}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={4}>
          {" "}
          <Button
            fullWidth
            onClick={null}
            variant="contained"
            startIcon={<UpIcon />}
            style={{ backgroundColor: "#28A745", color: "white" }}
          >
            {" "}
            Para Girişi
          </Button>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <Button
            fullWidth
            onClick={null}
            variant="contained"
            startIcon={<DownIcon />}
            style={{ backgroundColor: "#DC3545", color: "white" }}
          >
            {" "}
            Para Çıkışı
          </Button>
        </Grid>
        <Grid item xs={12}><PaymentList list={paymentList}/></Grid>
      </Grid>
  );
}

export default function CaseDialog({ open, onClose }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={"md"}
      disableBackdropClick={true}
    >
      <DialogTitle className={classes.title}>KASA</DialogTitle>
      <DialogContent>{page == 0 ? <MainPage paymentList={_list}/> : ""}</DialogContent>
      <DialogActions>
        <Button
          onClick={null}
          variant="contained"
          startIcon={<SaveIcon />}
          color="primary"
        >
          {" "}
          KAYDET
        </Button>
        <Button
          onClick={null}
          variant="contained"
          color="secondary"
          startIcon={<CloseIcon />}
        >
          İPTAL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
