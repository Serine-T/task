import { memo } from 'react';

import { Link } from 'react-router-dom';
import StyledTypography from '@containers/common/StyledTypography';

interface IMenuItem {
  path: string;
  title: string;
  isActive: boolean;
}

const MenuItem = ({ path, title, isActive }: IMenuItem) => (
  <Link to={path}>
    <StyledTypography variant="subtitle3" color={isActive ? 'blue' : 'grey'}>
      {title}
    </StyledTypography>
  </Link>
);

export default memo(MenuItem);
