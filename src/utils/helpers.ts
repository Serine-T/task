import moment from 'moment';

import { ISelectOptions } from './types';

export const formattedDate = (date: string) => {
  return (
    moment(date).format('YYYY-MM-DD, HH:mm')
  );
};

export const sleep = (delay = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

interface IItems {
  id: string;
  [key: string]: any;
}

export const getOptionsArray = (
  items: IItems[],
  fieldName?: string,
): ISelectOptions[] => {
  return items.map((item) => ({
    value: item.id,
    optionName: fieldName ? item[fieldName] : item.name,
  }));
};

export interface Filters {
  [key: string]: string | undefined;
}

export const constructQueryString = (filters: Filters): string => {
  return Object.entries(filters)
    .map(([key, value]) => value && `${key}=${key === 'searchTerm' ? encodeURIComponent(value) : value}`)
    .filter(Boolean)
    .join('&');
};
