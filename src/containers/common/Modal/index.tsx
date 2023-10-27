import { FC, memo } from 'react';

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface IDialogProps extends DialogProps {
  handleClose: () => void;
}

const Modal: FC<IDialogProps> = ({
  children,
  handleClose,
  ...restProps }) => {
  return (
    <Dialog
      {...restProps}
      onBackdropClick={handleClose}
    >
      <DialogTitle sx={{ mb: 4 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default memo(Modal);
