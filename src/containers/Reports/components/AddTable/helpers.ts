import { createRequiredTextWidthValidation } from '@utils/schemas';
import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';

export interface IAddDataForm {
  id?: string;
  title: string;
  content: string;
  userId: string;
  dateCreated?: string;
}

export const defaultValues = {
  title: '',
  content: '',
  userId: '',
};

export const AddDataSchema = yup.object().shape({
  title: createRequiredTextWidthValidation('Title', 255),
  content: createRequiredTextWidthValidation('Content', 500),
  userId: createRequiredTextWidthValidation('User Id', 255),
});

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.text,
  },
  {
    label: 'Content',
    field: 'content',
    type: InputTypes.textarea,
  },
  {
    label: 'User',
    field: 'userId',
    type: InputTypes.select,
  },
];

export const formattedPayload = (data: IAddDataForm) => ({
  ...data,
  dateCreated: new Date().toISOString(),
});
