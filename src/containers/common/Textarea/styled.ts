import { styled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';

export const StyledFormControl = styled(FormControl)(() => ({
  width: '100%',
  borderRadius: 4,
  padding: 0,
  height: '72px',
}));

export const StyledTextareaAutosize = styled(TextareaAutosize, {
  shouldForwardProp: (prop) => prop !== 'error',
})<{error?: boolean}>(({ theme, error }) => ({
  width: '100%',
  borderRadius: 4,
  padding: '10px 12px',
  outline: 'none',
  border: `1px solid ${error ? theme.palette.error.dark : theme.palette.grey[500]}`,
  fontSize: '12px',
  fontFamily: FontFamilyNames.DmSansRegular,
  marginBottom: error ? '4px' : '',
  overflow: 'auto  !important',

  '&::placeholder': {
    color: '#ced5da',
    border: 'none',
  },

  '&:hover': {
    borderColor: error ? theme.palette.error.dark : theme.palette.common.black,
  },

  '&:focus': {
    borderColor: error ? theme.palette.error.dark : theme.palette.primary.dark,
  },

  '&:hover:focus': {
    borderColor: error ? theme.palette.error.dark : theme.palette.primary.dark,
  },
}));
