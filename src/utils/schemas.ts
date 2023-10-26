import * as yup from 'yup';
import { EMAIL_REGEXP } from '@utils/regexp';

export const createRequiredTextWidthValidation = (fieldName: string, maxLength: number) => {
  return yup.string().required(`${fieldName} is required`)
    .max(maxLength, `The maximum length is ${maxLength} characters`);
};

export const createTextWidthValidation = (maxLength: number) => {
  return yup.string().optional().test(
    'text-length-validation',
    `The maximum length is ${maxLength} characters`,
    (value: string | undefined) => {
      if (!value) {
        return true;
      }

      return yup.string().max(maxLength).isValidSync(value);
    },
  );
};

export const EmailSchema = {
  email: createRequiredTextWidthValidation('Email', 255)
    .matches(
      EMAIL_REGEXP,
      'Email is invalid',
    )
    .max(255, 'The maximum length is 255 characters'),
};
