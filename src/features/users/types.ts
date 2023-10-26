export interface IState {
  isLoading: boolean;
  data: IUserInfo[];
  actionLoading: boolean;
  offset: number;
  hasMoreItems: boolean;
}

export interface IUserPayload {
  id?: string;
  name: string;
  email: string;
  dateJoined: string;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
}
