import { memo } from 'react';

import StatisicsSection from './components/StatisicsSection';
import AnalyticsChart from './hh';

const Dashboard = () => {
  return (
    <>
      <StatisicsSection />
      <AnalyticsChart />
    </>
  );
};

export default memo(Dashboard);
