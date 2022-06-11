import React from "react";
import { User } from "../models/UserType";

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ContextType = {
  usersData: User[];
  updateDataUsers: (data: User[]) => void;
  updateOneUser: (data: User) => void;
};

const UsersDataContext = React.createContext<ContextType>({} as ContextType);

const { Provider } = UsersDataContext;

const UsersDataProvider = ({ children }: Props) => {
  const [usersData, setUsersData] = React.useState<User[]>([]);

  const updateDataUsers = (data: User[]) => {
    setUsersData(data);
  };

  const updateOneUser = (data: User) => {
    
    const newUsersData = usersData.map((user) => {
      if (user._id === data._id) {
        return {...user, ...data} ;
      }
      return user;
    });
    console.log("newUsersData", newUsersData);
    setUsersData(newUsersData);
  };

  const content: ContextType = {
    usersData,
    updateDataUsers,
    updateOneUser,
  };
  return <Provider value={content}>{children}</Provider>;
};

export { UsersDataContext, UsersDataProvider };
