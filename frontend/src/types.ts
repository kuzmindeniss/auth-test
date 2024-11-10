export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
}

export interface UserFormData {
  login: string;
  password: string;
}

export interface Error {
  msg: string;
  path: string;
}

export type ResponseWithErrors = { errors?: Error[] };
