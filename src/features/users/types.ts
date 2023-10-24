export interface IState {
  isLoading: boolean;
  data: IUserInfo[];
  actionLoading: boolean;
}

export interface IAddUserPayload {
  id?: string;
  name: string;
  email: string;
  dateJoined?: string;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
}
