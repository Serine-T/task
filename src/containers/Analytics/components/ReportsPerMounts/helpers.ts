import { IReportInfo } from '@features/reports/types';

interface IProcessedReport {
  month: string;
  reports: number;
}

interface IProceesData {
  [key: string]: IProcessedReport;
}
export const processData = (reports: IReportInfo[]) => {
  const data = {} as IProceesData;

  reports.forEach((report) => {
    const month = new Date(report.dateCreated).toLocaleString('default', { month: 'long', year: 'numeric' });

    if (!data[month]) {
      data[month] = { month, reports: 1 };
    } else {
      data[month].reports += 1;
    }
  });

  return Object.values(data);
};
