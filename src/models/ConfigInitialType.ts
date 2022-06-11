import { User } from "./UserType";
export interface ConfigInitial {
  name?: string;
  initial_user_credits?: number;
  initial_months_limit?: number;
  user?: User;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
