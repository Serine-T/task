import { memo } from 'react';

import { InputTypes, ValidFieldNames } from '@utils/types';
import { useFormContext } from 'react-hook-form';

import Input from '../../../Input';
import Textarea from '../../../Textarea';
import Select from '../../../Select';
import { ISelectList } from './helpers';

interface IReusableFields extends ValidFieldNames{
  selectList?: ISelectList[];
}

function ReusableFields({ field, type, label, selectList }: IReusableFields) {
  const { formState: { errors }, register } = useFormContext();

  if (type === InputTypes.text) {
    return (
      <Input
        type="text"
        placeholder={label}
        {...register(field)}
        errorMessage={errors?.[field]?.message as string}
        inputProps={
          { autoComplete: 'new-password' }
        }
      />
    );
  }

  if (type === InputTypes.textarea) {
    return (
      <Textarea
        errorMessage={errors?.[field]?.message as string}
        placeholder={label}
        {...register(field)}
      />
    );
  }

  if (type === InputTypes.select) {
    const selector = selectList?.find((item) => item.field === field);

    if (selector) {
      const { options } = selector;

      return <Select name={field} options={options} errorMessage={errors?.[field]?.message as string} />;
    }
  }

  return null;
}

export default memo(ReusableFields);
