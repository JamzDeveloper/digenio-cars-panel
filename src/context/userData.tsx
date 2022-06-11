import React from "react";
import { User } from "../models/UserType";

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ContextType = {
  userData: User;
  updateDataUser: (data: User) => void;
};

const UserDataContext = React.createContext<ContextType>({} as ContextType);

const { Provider } = UserDataContext;

const UserDataProvider = ({ children }: Props) => {
  const [userData, setUserData] = React.useState<User>({} as User);

  const updateDataUser = (data: User) => {
    
    setUserData({
      ...userData,
      ...data,
    });
    
  };

  const content: ContextType = {
    userData,
    updateDataUser,
  };
  return <Provider value={content}>{children}</Provider>;
};

export { UserDataContext, UserDataProvider };
