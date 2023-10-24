import * as yup from 'yup';
import { EmailSchema } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';

export interface IAddForm {
  id?: string;
  name: string;
  email: string;
}

export const defaultValues = {
  name: '',
  email: '',
};

export const AddSchema = {
  name: yup.string().required('Name is required'),
  email: EmailSchema.email,
};

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Name',
    field: 'name',
    type: InputTypes.text,
  },
  {
    label: 'Email',
    field: 'email',
    type: InputTypes.text,
  },
  {
    label: 'Last Name',
    field: 'lastName',
    type: InputTypes.text,
  },
  {
    label: 'Password',
    field: 'password',
    type: InputTypes.text,
  },
  {
    label: 'Email',
    field: 'email',
    type: InputTypes.text,
  },
];
