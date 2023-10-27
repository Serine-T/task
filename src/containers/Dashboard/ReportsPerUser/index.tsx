import { memo } from 'react';

import { useAppSelector } from '@features/app/hooks';
import { selectReports } from '@features/reports/selectors';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { processUserReportBreakdown } from './helpers';

const ReportsPerUser = () => {
  const { data: reports } = useAppSelector(selectReports);

  return (
    <BarChart width={600} height={300} data={processUserReportBreakdown(reports)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="userId" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="reports" fill="#8884d8" />
    </BarChart>
  );
};

export default memo(ReportsPerUser);
