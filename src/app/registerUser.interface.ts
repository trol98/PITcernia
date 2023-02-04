export interface RegisterUser {
  login: string;
  email: string;
  password: string;
  active: boolean;
  verified: boolean;
  admin: boolean;
}
