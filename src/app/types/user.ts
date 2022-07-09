export interface IUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMeta {
  current: number;
  perPage: number;
  total: number;
}

export interface IUserResponse {
  data: Array<IUser>;
  meta: IMeta;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IList {
  sort: string; 
  order: 'desc' | 'asc' | '';
  page: number;
  perPage: number;
  search?: string;
}