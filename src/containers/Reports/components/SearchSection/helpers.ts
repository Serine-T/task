import * as yup from 'yup';

export interface IFiltersForm {
  userId?: string;
}

export const FiltersSchema = yup.object().shape({
});
