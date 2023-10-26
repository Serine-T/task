import { createSlice, current } from '@reduxjs/toolkit';

import { IState } from './types';
import { addUser, editUser, getAllUsers, getUserById } from './actions';
import { paginationLimit } from './contants';

const initialState: IState = {
  isLoading: true,
  data: [],
  total: 0,
  actionLoading: false,
  offset: 0,
  hasMoreItems: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    incrementOffset: (state) => {
      state.offset += paginationLimit;
    },

    resetUsers: (state) => {
      state.offset = 0;
      state.hasMoreItems = true;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      if (!state.offset) {
        state.isLoading = true;
      }
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.data = [...current(state.data), ...payload];
      state.offset += 1;
      state.isLoading = false;
      if (payload.length < paginationLimit) {
        state.hasMoreItems = false;
      }
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editUser.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addUser.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(addUser.rejected, (state) => {
      state.actionLoading = false;
    });
  },
});

export const { incrementOffset, resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
