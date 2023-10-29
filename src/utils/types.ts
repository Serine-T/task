import { AxiosResponse } from 'axios';

export enum InputTypes {
  text = 'text',
  textarea = 'textarea',
  checkbox = 'checkbox',
  select = 'select',
  image = 'image',
  colorPicker ='colorPicker'
}

export type ValidFieldNames = {
  label: string;
  field:string;
  type: InputTypes;
  isRequired?: boolean;
}

export type AxiosData = AxiosResponse['data']
export enum REQUEST_STATUS {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED'
}

export type ErrorType = {
  error: string;
  message: string;
  statusCode: number;
}

export interface ISelectOptions {
  optionName: string;
  value: any;
}
