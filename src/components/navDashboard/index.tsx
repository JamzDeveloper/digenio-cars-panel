import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { NavContainer, ContainerLogo, Wrapper, LinkP } from "./style";
import { Props, Routes } from "./types";
import StoreIcon from "../../assets/svg-components/Store";
import UsersIcon from "../../assets/svg-components/Users";
import NoteIcon from "../../assets/svg-components/Note";
import { NavContext } from "../../context/navContext";
import ItemNav from "./item";

const initialRoutes: Routes = {
  users: false,
  admin: false,
  home: false,
  logout: false,
  products: false,
  plans: false,
  properties: false,
  configinitial: false,
};
const NavDashboard = ({ routerActual }: Props) => {
  const [routesActual, setRoutesActual] = useState<Routes>(initialRoutes);
  const { navLateral } = useContext(NavContext);
  const onchangeRoute = (route: string) => {
    setRoutesActual({
      ...initialRoutes,
      [route]: true,
    });
  };
  useEffect(() => {
    if (routerActual) {
      onchangeRoute(routerActual);
    }
  }, [routerActual]);
  return (
    <NavContainer stateNavbar={navLateral}>
      <Link href={"/dashboard"} passHref>
        <ContainerLogo>
          <StoreIcon height={30} width={30} />{" "}
          <LinkP stateNavbar={navLateral} stateRoute={routesActual.products}>
            Dashboard
          </LinkP>
        </ContainerLogo>
      </Link>
      <Wrapper>
        <ul>
          <ItemNav
            href="/dashboard/users"
            onchangeRoute={onchangeRoute}
            nameRoute="users"
            Icon={UsersIcon}
            text="Users"
            navLateral={navLateral}
            stateRoute={routesActual.users}
          />
          <ItemNav
            href="/dashboard/products"
            onchangeRoute={onchangeRoute}
            nameRoute="products"
            Icon={UsersIcon}
            text="Products"
            navLateral={navLateral}
            stateRoute={routesActual.products}
          />
          <ItemNav
            href="/dashboard/plans"
            onchangeRoute={onchangeRoute}
            nameRoute="plans"
            Icon={NoteIcon}
            text="Plans"
            navLateral={navLateral}
            stateRoute={routesActual.plans}
          />
          <ItemNav
            href="/dashboard/properties"
            onchangeRoute={onchangeRoute}
            nameRoute="properties"
            Icon={NoteIcon}
            text="Properties"
            navLateral={navLateral}
            stateRoute={routesActual.properties}
          />
          <ItemNav
            href="/dashboard/configinitial"
            onchangeRoute={onchangeRoute}
            nameRoute="configinitial"
            Icon={NoteIcon}
            text="Config Initial"
            navLateral={navLateral}
            stateRoute={routesActual.configinitial}
          />
        </ul>
      </Wrapper>
    </NavContainer>
  );
};

export default NavDashboard;
