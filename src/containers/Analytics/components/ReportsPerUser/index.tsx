import { memo } from 'react';

import { useAppSelector } from '@features/app/hooks';
import { selectReports } from '@features/reports/selectors';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { processUserReportBreakdown } from './helpers';

const ReportsPerUser = () => {
  const { data: reports } = useAppSelector(selectReports);

  return (
    <BarChart
      width={300}
      height={250}
      data={processUserReportBreakdown(reports)}
      margin={{ top: 16, right: 0, left: 0, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis label={{ value: 'User Id', position: 'bottom' }} />
      <YAxis label={{ value: 'Reports Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="reports" fill="#8884d8" />
    </BarChart>
  );
};

export default memo(ReportsPerUser);
