import { Product } from "./ProductType";
export interface Result {
  data: Data;
}

export interface Data {
  getUserPersonal: User;
}

export interface User {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  type_user?: string;
  type_account?: string;
  name?: string;
  gender?: string;
  date_birth?: null;
  phone_number?: PhoneNumber;
  photo?: string;
  publication_limit?: Date;
  premiun?: boolean;
  state?: boolean;
  credits?: number;
  recovery_code?: string;
  products?: Product[];
}
interface PhoneNumber {
  number: string;
  country_code: number;
}
