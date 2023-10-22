import { memo } from 'react';

import MenuItem from '@mui/material/MenuItem';
import { useFormContext } from 'react-hook-form';
import {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ISelectOptions } from '@utils/types';

import { StyledFormControl, StyledSelect } from './styled';
import { StyledInputBox, StyledInputLabel } from '../Input/styled';
import ErrorMessage from '../ErrorMessage';
import { selectDefaultValue } from './helpers';

interface ISelectProps extends SelectProps {
  errors?: any;
  label?: string;
  options: ISelectOptions[];
  width?: string;
  name: string;
  errorMessage?: string;
  marginBottom?: number;
}

const Select = ({
  name,
  label,
  errors,
  options,
  width,
  errorMessage,
  marginBottom,
  ...restProps
}: ISelectProps) => {
  const { watch, setValue } = useFormContext();
  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    if (name) {
      setValue(name, e.target.value, { shouldValidate: true });
    }
  };

  const optionsList = [{
    value: selectDefaultValue,
    optionName: 'Select...',
  }, ...options];

  return (
    <StyledInputBox marginBottom={marginBottom} errorMessage={!!errorMessage}>
      { label && <StyledInputLabel shrink>{label}</StyledInputLabel>}
      <StyledFormControl width={width} error={!!errorMessage}>
        <StyledSelect
          id={name}
          labelId={name}
          value={watch(name)}
          onChange={handleSelectChange}
          {...restProps}
          displayEmpty
        >
          {optionsList.map(({ optionName, value }) => (
            <MenuItem key={value} value={value}>
              <Typography variant="body3">{optionName}</Typography>
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledInputBox>
  );
};

export default memo(Select);
