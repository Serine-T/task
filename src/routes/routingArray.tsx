import { Navigate, RouteObject } from 'react-router-dom';
import Analytics from '@containers/Analytics';
import NotFound from '@containers/NotFound';
import Layout from 'src/Layout';
import PAGE_ROUTES from '@routes/routingEnum';
import AddUser from '@containers/Users/components/AddComponent';
import EditUser from '@containers/Users/components/EditComponent';
import Users from '@containers/Users';
import Reports from '@containers/Reports';
import AddReport from '@containers/Reports/components/AddComponent';
import EditReport from '@containers/Reports/components/EditComponent';

export const routingArray: RouteObject[] = [
  { path: '*', element: <NotFound /> },
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
