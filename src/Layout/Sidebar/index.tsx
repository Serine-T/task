import { memo, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import useResponsive from '@customHooks/useResponsive';

import { StyledBox, StyledDraw } from './styled';
import SidebarMenu from './components/SidebarMenu';

interface ISidebar {
  open: boolean;
  onCloseNav: () => void;
}

const Sidebar = ({ open, onCloseNav }: ISidebar) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (open) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return isDesktop ? (
    <StyledBox
      component="nav"
      flexShrink={{ lg: 0 }}
    >
      <StyledDraw open variant="permanent">
        <SidebarMenu />
      </StyledDraw>
    </StyledBox>
  ) : (
    <StyledDraw
      open={open}
      onClose={onCloseNav}
    >
      <SidebarMenu />
    </StyledDraw>
  );
};

export default memo(Sidebar);
