import { forwardRef, memo } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IStyledSnackbar {
  type?: AlertColor;
  message: string;
  open: boolean;
  handleClose: () => void;
}

const StyledSnackbar = ({ type = 'success', message, open, handleClose }:IStyledSnackbar) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={type}>
      {message}
    </Alert>
  </Snackbar>
);

export default memo(StyledSnackbar);
