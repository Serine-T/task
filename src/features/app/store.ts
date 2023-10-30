import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '@features/users/slice';
import reportsReducer from '@features/reports/slice';
import errorsReducer from '@features/errors/slice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    reports: reportsReducer,
    errors: errorsReducer,
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
export default store;
