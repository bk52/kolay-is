import React, { useState, useRef } from "react";
import {useDispatch,useSelector} from "react-redux";
import {types} from "../redux/constants/action-types";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import lang from "../lang/langTR";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 300,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 10,
  },
  formElement: {
    width: "100%",
  },
  label:{
    textTransform: 'none',
  }
}));

export default function Login() {
  const userState = useSelector( state => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const formRef = useRef();
  const [errName, seterrName] = useState(false);
  const [errPass, seterrPass] = useState(false);

  function LoginClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const username = formRef.current["login-username"].value;
    const password = formRef.current["login-password"].value;
    if (!username || username == "") {
      seterrName(true);
    } else {
      seterrName(false);
    }
    if (!password || password == "") {
      seterrPass(true);
    } else {
      seterrPass(false);
    }
    if (username && username != "" && password && password != "") {
      dispatch({type:types.AUTH_LOADING,payload:{loading:true}});
      dispatch({type:types.AUTH_SEND,payload:{username,password}});
    }
  }

  return (
    <form className={classes.root} ref={formRef} onSubmit={(e)=>LoginClick(e)}>
      {userState.isLoading ? (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="login-username"
              className={classes.formElement}
              label={lang.Login_Username}
              variant="outlined"
              error={errName}
              helperText={errName ? lang.Login_Validation : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="login-password"
              className={classes.formElement}
              label={lang.Login_Password}
              type="password"
              variant="outlined"
              error={errPass}
              helperText={errPass ? lang.Login_Validation : null}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              classes={{
                root: classes.formElement, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            >
              {lang.Login_Login}
            </Button>
          </Grid>
          {userState.isAuthError ? <Grid item xs={12}>
            <Alert severity="error">
              {userState.authErrorMessage}
            </Alert>
          </Grid> : null}
        </Grid>
      )}
    </form>
  );
}
