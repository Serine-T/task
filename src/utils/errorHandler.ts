import { errorMessages } from './errorMessages';
import { ErrorType } from './types';

export const customErrorHandling = (error: any): ErrorType => {
  const statusText = error?.statusText;
  let message = statusText as string;

  if (statusText in errorMessages) {
    message = errorMessages[statusText];
  }

  return { message } as ErrorType;
};
