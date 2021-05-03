import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { types } from "../redux/constants/action-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import CustomerInfo from "./CustomerInfo";


export default function CustomerDialog(props) {
  const dispatch = useDispatch();
  const customerTabsRef = useRef();
  const [showSave, setshowSave] = useState(true);
  const handleClose = () => {
    dispatch({ type: types.CUSTOMER_MODAL_CLOSE, payload: {} });
  };
  const saveForm = () => {
    if (customerTabsRef) {
      customerTabsRef.current.saveForm();
    }
  };
  return (
    <React.Fragment>
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
          <React.Fragment>
            <DialogTitle>
              Müşteri Bilgileri
            </DialogTitle>
            <DialogContent>
               <CustomerInfo ref={customerTabsRef}/>
            </DialogContent>
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
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
}
