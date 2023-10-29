import { EmailSchema, createRequiredTextWidthValidation } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  name: string;
  email: string;
  dateJoined?: string;
}

export const defaultValues = {
  name: '',
  email: '',
};

export const AddDataSchema = yup.object().shape({
  name: createRequiredTextWidthValidation('Name', 255),
  email: EmailSchema.email,
});

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
];

export const formattedPayload = (data: IAddDataForm) => ({
  ...data,
  dateJoined: new Date().toISOString(),
});
