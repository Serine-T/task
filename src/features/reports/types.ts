export interface IState {
  isLoading: boolean;
  data: IReportInfo[];
  actionLoading: boolean;
}

export interface IReportPayload {
  id?: string;
  title: string;
  content: string;
  userId: string;
  dateCreated: string;
}

export interface IReportInfo {
  id: string;
  title: string;
  content: string;
  userId: string;
  dateCreated: string;
}
