import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { types } from "../redux/constants/action-types";

import Tabs from "./Tabs";
import LinearProgress from "@material-ui/core/LinearProgress";

import CustomerInfo from "./CustomerInfo";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import WorkIcon from "@material-ui/icons/Work";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const tabList = [
  {
    index: 0,
    title: "GENEL BİLGİLER",
    icon: <AccountBoxIcon />,
    component: <CustomerInfo ref={null}/>,
  },
  {
    index: 1,
    title: "SİPARİŞLER",
    icon: <WorkIcon />,
    component: <div>Siparişler</div>,
  },
  {
    index: 2,
    title: "HESAP ÖZETİ",
    icon: <AccountBalanceIcon />,
    component: <div>Hesap Özeti</div>,
  },
]

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: theme.spacing(0),
  },
}));

export default function CustomerDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customerTabsRef = useRef();
  const [showSave, setshowSave] = useState(true);
  const handleClose = () => {
    dispatch({ type: types.CUSTOMER_MODAL_CLOSE, payload: {} });
  };
  const saveForm = () => {

    if (customerTabsRef) {
      customerTabsRef.current.saveCustomerForm();
    }
  };
  const isFirstTab = (val) => {
    setshowSave(val);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        disableBackdropClick={true}
      >
        {props.loading ? (
          <LinearProgress />
        ) : (
          <div>
            <DialogTitle className={classes.modal} id="alert-dialog-title">
              <Tabs ref={customerTabsRef} isFirstTab={isFirstTab} tabList={tabList}></Tabs>
            </DialogTitle>
            <DialogActions>
              {showSave ? (
                <Button
                  onClick={saveForm}
                  variant="contained"
                  startIcon={<SaveIcon />}
                  color="primary"
                >
                  KAYDET
                </Button>
              ) : (
                ""
              )}
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
                startIcon={<CloseIcon />}
              >
                İPTAL
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
}
