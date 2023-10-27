import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllReports } from '@features/reports/actions';
import useMount from '@customHooks/useMount';
import { selectReports } from '@features/reports/selectors';
import Loader from '@containers/common/Loader';

import ReportsPerMounts from './ReportsPerMounts';
import ReportsPerUser from './ReportsPerUser';

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectReports);

  useMount(() => {
    dispatch(getAllReports());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ReportsPerMounts />
      <ReportsPerUser />
    </>
  );
};

export default Analytics;
