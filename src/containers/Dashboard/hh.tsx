import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', reports: 5 },
];

const AnalyticsChart = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="reports" fill="#8884d8" />
    </BarChart>
  );
};

export default AnalyticsChart;
