import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CustomPieChart from "../components/CustomPieChart";
import AutoComplete from "../components/AutoComplete";
import BalanceDetails from "../components/BalanceDetails";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { url } from "../redux/constants/action-url";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const data = [
  { name: "Gecikmiş", value: 400, unit: "₺", color: "#ef233c" },
  { name: "Planlanmamış", value: 300, unit: "₺", color: "#38a3a5" },
  { name: "Diğer", value: 200, unit: "₺", color: "#b1a7a6" },
];

let selectedId="";
export default function AccountBalance(props) {
  const classes = useStyles();
  const [details, setDetails]=useState({
    showDetails:false,
    customerId:""
  })

  function AutoCompleteChanged(e){
    if(e){selectedId=e._id;}
  }

  function GetDetails(e){
    e.preventDefault();
    e.stopPropagation();
    if(selectedId && selectedId!=""){
      setDetails({
        customerId:selectedId,
        showDetails:true
      })
    }
  }

  function GoAccountBalance(){
    setDetails({
      customerId:"",
      showDetails:false
    })
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
            <CustomPieChart
              width={500}
              heigth={500}
              centerText={{
                title: "Genel Toplam",
                value: 900,
                unit: "₺",
                fill: "#52b788",
              }}
              data={data}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Ödemeler
            </Typography>
            <CustomPieChart
              width={500}
              heigth={500}
              centerText={{
                title: "Genel Toplam",
                value: 900,
                unit: "₺",
                fill: "#52b788",
              }}
              data={data}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{padding: "8px"}}>
            <Grid container>
              <Grid item xs={10}>
                <AutoComplete sourceURL={url.SEARCH} selectedChanged={AutoCompleteChanged}/>
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
    </div>
  );
}
