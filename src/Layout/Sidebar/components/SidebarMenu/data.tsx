import PAGE_ROUTES from '@routes/routingEnum';

import { INavBarItem } from './types';

const navData: INavBarItem[] = [
  {
    id: 'analytics',
    title: 'Analytics',
    path: PAGE_ROUTES.ANALYTICS,
  },
  {
    id: 'users',
    title: 'Users',
    path: PAGE_ROUTES.USERS,
  },
  {
    id: 'reports',
    title: 'Reports',
    path: PAGE_ROUTES.REPORTS,
  },
];

export default navData;
