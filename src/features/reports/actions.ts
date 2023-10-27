import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';

import { IReportPayload, IReportInfo } from './types';

const prefix = '/reports';

export const addReport = createAsyncThunk<void, IReportPayload, {
  rejectValue: AxiosData;
}>(
  'reports/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IReportPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllReports = createAsyncThunk<IReportInfo[], string | undefined, {
  rejectValue: AxiosData;
}>(
  'reports/all',
  async (userId, thunkAPI) => {
    try {
      const query = userId ? `?userId=${userId}` : '';
      const { data } = await http.get<IReportInfo[]>(`${prefix}${query}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getReportById = createAsyncThunk<IReportInfo, string, {
  rejectValue: AxiosData;
}>(
  'reports/getReport',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<IReportInfo>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editReport = createAsyncThunk<void, IReportPayload, {
  rejectValue: AxiosData;
}>(
  'reports/edit',
  async (body, thunkAPI) => {
    try {
      await http.put<IReportPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteReport = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'reports/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
