import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ContextType = {
  navLateral: boolean;
  setNavLateralState: (state: boolean) => void;
};

const NavContext = React.createContext<ContextType>({} as ContextType);

const { Provider } = NavContext;

const NavProvider = ({ children }: Props) => {
  const [navLateral, setNavLateral] = React.useState<boolean>(false);

  const setNavLateralState = (state: boolean) => {
    setNavLateral(state);
  };

  const content: ContextType = {
    navLateral,
    setNavLateralState,
  };
  return <Provider value={content}>{children}</Provider>;
};

export { NavContext, NavProvider };
