import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CustomPieChart from "../components/CustomPieChart";
import AutoComplete from "../components/AutoComplete";
import BalanceDetails from "../components/BalanceDetails";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {GetPaymentStats} from "../redux/actions/customerPaymentsApi"
import CaseDialog from "../components/CaseDialog";
import CaseActiveDialog from "../components/CaseActiveDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  activeButtons:{
    width:"90%",
    marginBottom:"8px"
  }
}));

let selectedId="";
export default function AccountBalance(props) {
  const classes = useStyles();
  const [activeStats,setActiveStats]=useState({
    incomeSum:0,
    incomeActive:0,
    incomeDelayed:0,
    expenseSum:0,
    expenseActive:0,
    expenseDelayed:0
  });
  const [details, setDetails]=useState({showDetails:false,customerId:""})
  const [caseModal, setCaseModal]=useState(false);
  const [caseActive, setCaseActive]=useState({open:false, balanceType:1});
  const closeCaseDialog=()=>{setCaseModal(false)}
  const closeCaseActive=()=>{setCaseActive({open:false})}

  useEffect(() => {
    GetPaymentStats()
    .then((response)=>{
      if(response && response.data && response.data.stats){
        setActiveStats({
          incomeSum:parseFloat(response.data.stats.incomeSum),
          incomeActive:parseFloat(response.data.stats.incomeActive),
          incomeDelayed:parseFloat(response.data.stats.incomeDelayed),
          expenseSum:parseFloat(response.data.stats.expenseSum),
          expenseDelayed:parseFloat(response.data.stats.expenseDelayed),
          expenseActive:parseFloat(response.data.stats.expenseActive),
        })
      }
    })
    .catch((err)=>{console.log(err)})
  }, []);

  function AutoCompleteChanged(e){
    if(e){selectedId=e._id;}
  }

  function GetDetails(e){
    e.preventDefault();
    e.stopPropagation();
    if(selectedId && selectedId!=""){
      setDetails({customerId:selectedId,showDetails:true})
    }
  }

  function GoAccountBalance(){
    setDetails({ customerId:"",showDetails:false})
  }
   
  return (
    <div className={classes.root}>
     { 
        details.showDetails ?  <BalanceDetails customerId={details.customerId} GoAccountBalance={GoAccountBalance}></BalanceDetails>
        : <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Tahsilatlar
            </Typography>
            {activeStats.incomeSum && activeStats.incomeSum!=0 ? <div style={{cursor:"pointer"}} onClick={()=>{setCaseActive({open:true, balanceType:1})}}><CustomPieChart
              width={500}
              heigth={500}
              centerText={{title: "Genel Toplam",value: activeStats.incomeSum,unit: "₺",fill: "#52b788"}}
              data={
                [
                  {name: "Aktif", value: activeStats.incomeActive, unit: "₺", color: "#28A745" },
                  {name: "Gecikmiş", value: activeStats.incomeDelayed, unit: "₺", color: "#DC3545"}
                ]
              }
            /></div> : "Tahsilat bilgisi bulunamadı"}
            {/* <Button className={classes.activeButtons} variant="contained" style={{backgroundColor:"#28A745", color: "white"}} onClick={()=>{setCaseActive({open:true, balanceType:1})}}>Aktif Tahsilatları Göster</Button> */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Borçlar
            </Typography>
            {activeStats.expenseSum && activeStats.expenseSum!=0 ? <div onClick={()=>{setCaseActive({open:true, balanceType:2})}}><CustomPieChart
              width={500}
              heigth={500}
              centerText={{title: "Genel Toplam",value: activeStats.expenseSum,unit: "₺",fill: "#52b788"}}
              data={
                [
                  {name: "Aktif", value: activeStats.expenseActive, unit: "₺", color: "#28A745" },
                  {name: "Gecikmiş", value: activeStats.expenseDelayed, unit: "₺", color: "#DC3545"}
                ]
              }
            /></div> : "Borç bilgisi bulunamadı"}
             {/* <Button className={classes.activeButtons} variant="contained" style={{backgroundColor:"#DC3545", color: "white"}} onClick={()=>{setCaseActive({open:true, balanceType:2})}}>Aktif Borçları Göster</Button> */}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" style={{height:64}} onClick={()=>{setCaseModal(true)}} fullWidth>KASAYA GİT</Button>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper} style={{padding: "8px"}}>
            <Grid container>
              <Grid item xs={10}>
                <AutoComplete selectedChanged={AutoCompleteChanged}/>
              </Grid>
              <Grid item xs={2} style={{paddingTop: "4px"}}>
                <Fab size="small" color="primary" aria-label="add" onClick={(e)=>GetDetails(e)}>
                  <ArrowForwardIosIcon />
                </Fab>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
     }
     <CaseDialog open={caseModal} onClose={closeCaseDialog}/>
     <CaseActiveDialog open={caseActive.open} balanceType={caseActive.balanceType} onClose={closeCaseActive}/>
    </div>
  );
}