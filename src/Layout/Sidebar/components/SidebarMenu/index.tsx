import { memo } from 'react';

import { useLocation } from 'react-router-dom';

import navData from './data';
import MenuItem from '../MenuItem';

const SidebarMenu = () => {
  const { pathname } = useLocation();

  return navData.map(({ id, path, title }) => (
    <MenuItem
      key={id}
      title={title}
      path={path}
      isActive={pathname.startsWith(path)}
    />
  ));
};

export default memo(SidebarMenu);
