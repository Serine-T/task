import { useRoutes } from 'react-router-dom';

import { routingArray } from './routingArray';

const Router = () => (
  useRoutes(routingArray)
);

export default Router;
