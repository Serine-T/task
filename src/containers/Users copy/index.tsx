import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import { getAllReports } from '@features/reports/actions';
import { selectReports } from '@features/reports/selectors';
import { getAllUsers } from '@features/users/actions';

import ReportsTable from './components/ReportsTable';
import SearchSection from './components/SearchSection';

const Reports = () => {
  const dispatch = useAppDispatch();
  const { data: reports, isLoading } = useAppSelector(selectReports);

  useMount(() => {
    dispatch(getAllUsers()).unwrap().then((data) => {
      if (data.length) {
        dispatch(getAllReports());
      }
    }).catch(() => {});
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle
        title="Reports"
        btnName="Add Report"
        path={PAGE_ROUTES.ADD_REPORT}
      />

      {reports.length ? (
        <>
          <SearchSection />
          <ReportsTable />
        </>
      ) : (
        <EmptyState text="reports" />
      )}
    </>
  );
};

export default Reports;
