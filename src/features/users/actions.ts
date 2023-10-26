import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';

import { IUserPayload, IUserInfo } from './types';

const prefix = '/users';

export const addUser = createAsyncThunk<void, IUserPayload, {
  rejectValue: AxiosData;
}>(
  'users/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IUserPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllUsers = createAsyncThunk<IUserInfo[], number, {
  rejectValue: AxiosData;
}>(
  'users/all',
  async (offset, thunkAPI) => {
    try {
      const limit = 2;
      const { data } = await http.get<IUserInfo[]>(`${prefix}?_start=${offset}&_limit=${limit}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getUserById = createAsyncThunk<IUserInfo, string, {
  rejectValue: AxiosData;
}>(
  'users/get-user',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<IUserInfo>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editUser = createAsyncThunk<void, IUserPayload, {
  rejectValue: AxiosData;
}>(
  'users/edit',
  async (body, thunkAPI) => {
    try {
      await http.put<IUserPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteUser = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
