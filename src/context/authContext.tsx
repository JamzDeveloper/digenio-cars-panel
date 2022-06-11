import React from "react";


type Props = {
  children: JSX.Element | JSX.Element[];
};

type StateAuth = {
  token: string;
  setAuthState: () => {};
};

type ContextType = {
  authState: string;
  setAuthState: (state: StateAuth) => void;
  isUserAuthenticated: () => {} | boolean;
};
type Data = {
  token: string;
};

const AuthContext = React.createContext<ContextType>({} as ContextType);

const { Provider } = AuthContext;

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState]: any = React.useState({
    token: "",
  });

  const setUserAuthInfo = (data: Data) => {
    const token = localStorage.setItem("token", data.token);

    setAuthState({
      token: token,
    });
  };

  const isUserAuthenticated = (): Boolean => {
    if (!authState.token) {
      return false;
    }
    return true;
  };

  const auth = {
    authState,
    setAuthState: (data: Data) => setUserAuthInfo(data),
    isUserAuthenticated,
  };
  return <Provider value={auth}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
