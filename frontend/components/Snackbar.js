import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider, withSnackbar } from 'notistack';

const notistackRef = React.createRef();
const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
}

export default {
  success: function (msg) {
    this.toast(msg, 'success');
  },
  error: function (msg) {
    this.toast(msg, 'error');
  },
  info: function (msg) {
    this.toast(msg, 'info');
  },
  warning: function (msg) {
    this.toast(msg, 'warning');
  },
  toast: function (msg, variant) {
    const Display = withSnackbar(({ message, enqueueSnackbar }) => {
      enqueueSnackbar(message, { variant });
      return null;
    });
    const mountPoint = document.getElementById('snackbarhelper');
    ReactDOM.render(
      <SnackbarProvider ref={notistackRef} action={(key) => (
        <CloseIcon onClick={onClickDismiss(key)}></CloseIcon>
    )} maxSnack={3} autoHideDuration={1000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}>
        <Display message={msg} variant={variant} />
      </SnackbarProvider>,
      mountPoint)
  }
}