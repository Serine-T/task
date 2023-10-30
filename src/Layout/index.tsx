import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import useResponsive from '@customHooks/useResponsive';
import { useAppSelector } from '@features/app/hooks';
import { selectErrors } from '@features/errors/selectors';
import ErrorAlert from '@containers/common/ErrorAlert';

import Sidebar from './Sidebar';
import { StyledMain, StyledRoot } from './styled';
import HeaderSection from './Header';

const Layout = () => {
  const isMobile = useResponsive('down', 'lg');
  const [open, setOpen] = useState(false);
  const { errorMessage } = useAppSelector(selectErrors);

  console.log('errorMessage', errorMessage);

  return (
    <StyledRoot>
      {isMobile && <HeaderSection onOpenNav={() => setOpen(true)} />}
      <Sidebar open={!isMobile || open} onCloseNav={() => setOpen(false)} />
      <StyledMain>
        <Outlet />
      </StyledMain>
      { errorMessage && <ErrorAlert />}
    </StyledRoot>
  );
};

export default Layout;
