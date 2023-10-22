import PAGE_ROUTES from '@routes/routingEnum';

export interface INavBarChildrenItem {
  path: PAGE_ROUTES;
  title: string;
}
export interface INavBarItem {
  id: string;
  title: string;
  path: PAGE_ROUTES;
  children?: INavBarChildrenItem[];
}
