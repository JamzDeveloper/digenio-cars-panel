import Link from "next/link";
import { ReactNode, useContext, useState } from "react";
import HeaderDashboard from "../../components/headerDashboard";
import NavDashboard from "../../components/navDashboard";
import { NavContext } from "../../context/navContext";
import { ContainerContent, DashboardContainer,ContainerChildren } from "./style";

type Props = {
  children?: ReactNode;
  routeActual?: string;
};

const Dashboard = ({ children, routeActual }: Props) => {
  const { navLateral} = useContext(NavContext);
  return (
    <DashboardContainer>
      <NavDashboard routerActual={routeActual} />
      <ContainerContent stateNavbar={navLateral}>
        <HeaderDashboard />
        <ContainerChildren>
        
        {children}
        </ContainerChildren>
      </ContainerContent>
    </DashboardContainer>
  );
};

export default Dashboard;
