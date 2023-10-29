import { memo } from 'react';

import Typography from '@mui/material/Typography';

interface ITitle {
  text: string;
}

const Title = ({ text }: ITitle) => (
  <Typography
    ml="50px"
    variant="h5"
    mb="16px"
  >
    {text}
  </Typography>
);

export default memo(Title);
