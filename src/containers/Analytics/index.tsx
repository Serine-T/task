import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllReports } from '@features/reports/actions';
import useMount from '@customHooks/useMount';
import { selectReports } from '@features/reports/selectors';
import Loader from '@containers/common/Loader';
import Typography from '@mui/material/Typography';

import ReportsPerMounts from './components/ReportsPerMounts';
import ReportsPerUser from './components/ReportsPerUser';

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
      <Typography variant="h6">Monthly statistics reports</Typography>
      <ReportsPerMounts />
      <Typography variant="h6">Statistics reports per user</Typography>
      <ReportsPerUser />
    </>
  );
};

export default Analytics;
