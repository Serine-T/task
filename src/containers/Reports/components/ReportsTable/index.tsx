import { memo } from 'react';

// import StyledTable from '@containers/common/Table';
// import { useAppDispatch, useAppSelector } from '@features/app/hooks';
// import Loader from '@containers/common/Loader';
// import { selectReports } from '@features/reports/selectors';
// import { getAllReports } from '@features/reports/actions';
// import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';
// import { selectUsers } from '@features/users/selectors';
// import useMount from '@customHooks/useMount';
// import { getAllUsers } from '@features/users/actions';
// import PAGE_ROUTES from '@routes/routingEnum';
// import PageTitle from '@containers/common/PageTitle';
// import EmptyState from '@containers/common/EmptyState';

// import TableRow from '../TableRow';
// import { IFiltersForm } from './SearchSection/helpers';
// import { headCells } from './helpers';
// import SearchSection from './components/SearchSection';
// import TableRow from './components/ReportsTable/TableRow';
// import { IFiltersForm } from './components/SearchSection/helpers';
// import SearchSection from './SearchSection';

const ReportsTable = () => {
  // const dispatch = useAppDispatch();
  // const { data: reports, isLoading } = useAppSelector(selectReports);
  // const { isLoading: usersLoading, allUsers } = useAppSelector(selectUsers);

  // useMount(() => {
  //   dispatch(getAllUsers());
  //   dispatch(getAllReports());
  // });

  // if (isLoading || usersLoading) {
  //   return <Loader />;
  // }

  // const location = useLocation();
  // const params = queryString.parse(location.search);

  // const { userId = '' } = params as IFiltersForm;

  // useEffect(() => {
  //   // dispatch(getAllReports());
  //   console.log('user id', userId);
  // }, [userId]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (

    <>
      8i8i
    </>
  );
};

export default memo(ReportsTable);
