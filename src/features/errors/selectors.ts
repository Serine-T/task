import { RootState } from '@features/app/store';

export const selectErrors = (state: RootState) => state.errors;
