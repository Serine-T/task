import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllReports } from '@features/reports/actions';
import useMount from '@customHooks/useMount';
import { selectReports } from '@features/reports/selectors';
import Loader from '@containers/common/Loader';

import Title from './components/ReusableTitle';
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
      <Title text="Statistic reports data of per month" />
      <ReportsPerMounts />
      <Title text="Statistic reports data of per month" />
      <ReportsPerUser />
    </>
  );
};

export default Analytics;
