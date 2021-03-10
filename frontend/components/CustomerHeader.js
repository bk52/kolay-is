import React from "react";
import {useDispatch} from "react-redux"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

export default function CustomerSearch({textChanged, buttonClick, textLabel, buttonIcon, buttonTooltip}) {

  const onClickButton=()=>{
    buttonClick();
  }

  return (
    <Grid
      container
      style={{
        flexGrow: 1,
        paddingBottom: "5px",
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
    >
      <Grid item xs={6}>
        <TextField label={textLabel}  onChange={textChanged} fullWidth />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2} style={{ textAlign: "right", margin: "auto" }}>
        <Tooltip title={buttonTooltip}>
          <Fab size="small" color="primary" aria-label="add" onClick={onClickButton}>
              {buttonIcon}
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
