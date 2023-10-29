import { IReportInfo } from '@features/reports/types';

interface IUserReportBreakdown {
  userId: string;
  reports: number;
}

export const processUserReportBreakdown = (reports: IReportInfo[]): IUserReportBreakdown[] => {
  const userReports: { [key: string]: IUserReportBreakdown } = {};

  reports.forEach((report) => {
    if (!userReports[report.userId]) {
      userReports[report.userId] = { userId: report.userId, reports: 1 };
    } else {
      userReports[report.userId].reports += 1;
    }
  });

  return Object.values(userReports);
};
