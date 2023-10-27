import { memo, useEffect } from 'react';

import StyledTable from '@containers/common/Table';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import { selectReports } from '@features/reports/selectors';
import { getAllReports } from '@features/reports/actions';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { selectUsers } from '@features/users/selectors';
import useMount from '@customHooks/useMount';
import { getAllUsers } from '@features/users/actions';
import PAGE_ROUTES from '@routes/routingEnum';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';

import { headCells } from './helpers';
import SearchSection from './components/SearchSection';
import TableRow from './components/ReportsTable/TableRow';
import { IFiltersForm } from './components/SearchSection/helpers';

const ReportsTable = () => {
  const dispatch = useAppDispatch();
  const { data: reports, isLoading } = useAppSelector(selectReports);
  const { isLoading: usersLoading, allUsers } = useAppSelector(selectUsers);
  const location = useLocation();
  const params = queryString.parse(location.search);

  const { userId = '' } = params as IFiltersForm;

  useMount(() => {
    dispatch(getAllUsers());
  });

  useEffect(() => {
    dispatch(getAllReports(userId));
  }, [userId, dispatch]);

  if (isLoading || usersLoading) {
    return <Loader />;
  }

  return (

    <>
      <PageTitle
        title="Reports"
        btnName="Add Report"
        path={PAGE_ROUTES.ADD_REPORT}
      />
      { (userId || !!reports.length) && <SearchSection />}
      {(allUsers.length && reports.length) ? (
        <StyledTable headCells={headCells}>
          { reports.map((item) => (
            <TableRow key={item.id} {...item} />
          ))}
        </StyledTable>
      ) : (
        <EmptyState
          text={!allUsers.length ? 'users' : (userId ? 'search' : 'reports')}
        />
      )}
    </>
  );
};

export default memo(ReportsTable);
