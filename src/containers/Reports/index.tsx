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
import useErrorHandler from '@customHooks/useErrorHandler';

import { headCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';
import TableRow from './components/TableRow';

const ReportsTable = () => {
  const dispatch = useAppDispatch();
  const { data: reports, isLoading } = useAppSelector(selectReports);
  const { isLoading: usersLoading, allUsers } = useAppSelector(selectUsers);
  const location = useLocation();
  const params = queryString.parse(location.search);
  const handleError = useErrorHandler();

  const { userId = '' } = params as IFiltersForm;

  useMount(() => {
    dispatch(getAllUsers()).unwrap().catch((e) => {
      handleError(e.message);
    });
  });

  useEffect(() => {
    dispatch(getAllReports(userId)).unwrap().catch((e) => {
      handleError(e.message);
      console.log('eetr', e.message);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          text={!allUsers.length ? 'There is no user. Please add a new one to proceed'
            : (userId ? 'No search results found' : 'There is no report. Please add a new one to proceed')}
        />
      )}
    </>
  );
};

export default memo(ReportsTable);
