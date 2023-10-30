import { SyntheticEvent, memo } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { reset } from '@features/errors/slice';
import { selectErrors } from '@features/errors/selectors';
import StyledSnackbar from '@containers/common/Alert';

const ErrorAlert = () => {
  const dispatch = useAppDispatch();
  const { errorMessage, isOpen } = useAppSelector(selectErrors);
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(reset());
  };

  return (
    <StyledSnackbar type="error" open={isOpen} handleClose={handleClose} message={errorMessage} />
  );
};

export default memo(ErrorAlert);
