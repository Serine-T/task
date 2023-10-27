import { memo } from 'react';

import { useAppSelector } from '@features/app/hooks';
import { selectReports } from '@features/reports/selectors';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { processData } from './helpers';

const ReportsPerMounts = () => {
  const { data: reports } = useAppSelector(selectReports);

  return (
    <BarChart width={600} height={300} data={processData(reports)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="reports" fill="#8884d8" />
    </BarChart>
  );
};

export default memo(ReportsPerMounts);
