import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DateRange from "./DateRange";
import Button from "@material-ui/core/Button";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AutoComplete from "../components/AutoComplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
let selectedId="";
export default function ReportCompanyAccount({title, onNewReport}) {
  const classes = useStyles();
  const datePickerRef = useRef();
  const onCreateReport = () => {
    if (datePickerRef && datePickerRef.current) {
      let dateRange = datePickerRef.current.GetDate();
      onNewReport({...dateRange,selectedId});
    }
  };
  const AutoCompleteChanged=(e)=>{if(e){selectedId=e._id;}}
  return (
    <div>
      <Typography variant="h5">
        <AccountBalanceIcon /> {title}
      </Typography>
      <hr />
      <DateRange ref={datePickerRef} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AutoComplete selectedChanged={AutoCompleteChanged} />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={onCreateReport}
            style={{ backgroundColor: "#28A745", color: "white" }}
          >
            Rapor Oluştur
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
