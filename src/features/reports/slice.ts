import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import { addReport, editReport, getAllReports, getReportById } from './actions';

const initialState: IState = {
  isLoading: false,
  data: [],
  actionLoading: false,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getAllReports.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllReports.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllReports.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getReportById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReportById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getReportById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editReport.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editReport.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(editReport.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addReport.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addReport.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(addReport.rejected, (state) => {
      state.actionLoading = false;
    });
  },
});

export default reportsSlice.reducer;
