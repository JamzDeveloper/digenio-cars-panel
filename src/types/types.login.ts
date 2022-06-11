import { User } from "../models/UserType";

export type Inputs = {
    username: string| null;
    password: string| null;
  };
  export type LoginType = {
    login: {
      token: string;
      user: User;
    };
  };
  