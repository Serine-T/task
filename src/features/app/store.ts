import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '@features/users/slice';
import reportsReducer from '@features/reports/slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    reports: reportsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
