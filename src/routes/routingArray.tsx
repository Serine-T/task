import { Navigate, RouteObject } from 'react-router-dom';
import NotFound from '@containers/NotFound';
import Layout from 'src/Layout';
import Analytics from '@containers/Analytics';
import Users from '@containers/Users';
import AddUser from '@containers/Users/AddComponent';
import EditUser from '@containers/Users/EditComponent';
import Reports from '@containers/Reports';
import AddReport from '@containers/Reports/AddComponent';
import EditReport from '@containers/Reports/EditComponent';

import PAGE_ROUTES from './routingEnum';

export const routingArray: RouteObject[] = [
  { path: PAGE_ROUTES.NOT_FOUND, element: <NotFound /> },
  {
    element: <Layout />,
    children: [
      { path: PAGE_ROUTES.HOME, element: <Navigate to={PAGE_ROUTES.ANALYTICS} /> },
      { path: PAGE_ROUTES.ANALYTICS, element: <Analytics /> },
      {
        path: PAGE_ROUTES.USERS,
        children: [
          { element: <Users />, index: true },
          { path: PAGE_ROUTES.ADD_USER, element: <AddUser /> },
          { path: PAGE_ROUTES.EDIT_USER, element: <EditUser /> },
        ],
      },
      { path: PAGE_ROUTES.REPORTS,
        children: [
          { element: <Reports />, index: true },
          { path: PAGE_ROUTES.ADD_REPORT, element: <AddReport /> },
          { path: PAGE_ROUTES.EDIT_REPORT, element: <EditReport /> },
        ] },
    ],
  },
];
