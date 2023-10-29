import { memo } from 'react';

import { useAppSelector } from '@features/app/hooks';
import { selectReports } from '@features/reports/selectors';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { processData } from './helpers';

const ReportsPerMonths = () => {
  const { data: reports } = useAppSelector(selectReports);

  return (
    <BarChart
      width={300}
      height={250}
      data={processData(reports)}
      margin={{ top: 16, right: 0, left: 0, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" label={{ value: 'Months', position: 'bottom' }} />
      <YAxis label={{ value: 'Reports Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="reports" name="" fill="#8884d8" />
    </BarChart>
  );
};

export default memo(ReportsPerMonths);
