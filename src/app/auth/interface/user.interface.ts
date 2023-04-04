export interface User {
  id: number;
  login: string;
  email: string;
  active: boolean;
  verified: boolean;
  admin: boolean;
  shipping_address: string;
}
