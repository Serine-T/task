import { RouteObject } from 'react-router-dom';
import Dashboard from '@containers/Dashboard';
import NotFound from '@containers/NotFound';
import Layout from 'src/Layout';
import PAGE_ROUTES from '@routes/routingEnum';
import AddUser from '@containers/Users/components/AddComponent';
import EditUser from '@containers/Users/components/EditComponent';
import Users from '@containers/Users';

export const routingArray: RouteObject[] = [
  { path: '*', element: <NotFound /> },
  {
    element: <Layout />,
    children: [
      { path: PAGE_ROUTES.HOME, element: <Dashboard /> },
      { path: PAGE_ROUTES.ANALYTICS, element: <Dashboard /> },
      {
        path: PAGE_ROUTES.USERS,
        children: [
          { element: <Users />, index: true },
          { path: PAGE_ROUTES.ADD_USER, element: <AddUser /> },
          { path: PAGE_ROUTES.EDIT_USER, element: <EditUser /> },
        ],
      },
      { path: PAGE_ROUTES.REPORTS, element: <Dashboard /> },
    ],
  },
];
