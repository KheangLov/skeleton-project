export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ILogin {
  email: string;
  password: string;
}