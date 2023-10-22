import { memo } from 'react';

import { InputTypes, ValidFieldNames } from '@utils/types';
import { useFormContext } from 'react-hook-form';

import Input from '../../../Input';
import Textarea from '../../../Textarea';
import Checkbox from '../../../Checkbox';
import ImageUpload from '../../../FileUploader';
import ColorPickerInput from '../../../ColorPickerInput';
import Select from '../../../Select';
import { ISelectList } from './helpers';

interface IReusableFields extends ValidFieldNames{
  selectList?: ISelectList[];
  fileList?: string[];
}

function ReusableFields({ field, type, label, selectList, fileList }: IReusableFields) {
  const { formState: { errors }, register } = useFormContext();

  if (type === InputTypes.text) {
    return (
      <Input
        type={field === 'password' ? 'password' : 'text'}
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

  if (type === InputTypes.checkbox) {
    return <Checkbox name={field as string} errorMessage={errors?.[field]?.message as string} />;
  }

  if (type === InputTypes.image) {
    const isFile = !!fileList?.includes(field);

    return (
      <ImageUpload
        name={field}
        errorMessage={errors?.[field]?.message as string}
        isFile={isFile}
      />
    );
  }

  if (type === InputTypes.colorPicker) {
    return <ColorPickerInput placeholder={label} name={field} errorMessage={errors?.[field]?.message as string} />;
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
