import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';

const initialState: IState = {
  errorMessage: '',
  isOpen: false,
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload || 'Something went wrong!';
      state.isOpen = true;
    },

    reset: (state) => {
      state.errorMessage = '';
      state.isOpen = false;
    },
  },
});

export const { setErrorMessage, reset } = errorsSlice.actions;

export default errorsSlice.reducer;
