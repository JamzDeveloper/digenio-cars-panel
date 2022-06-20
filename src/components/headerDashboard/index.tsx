import { Grid, Input, User } from "@nextui-org/react";
import MenuBurguerIcon from "../../assets/svg-components/MenuBurguer";

import { ContainerHeader, ContainerMenuBurguer } from "./style";
import { useContext } from "react";
import { NavContext } from "../../context/navContext";
import { UserDataContext } from "../../context/userData";

const HeaderDashboard = () => {
  const { navLateral, setNavLateralState } = useContext(NavContext);
  const { userData } = useContext(UserDataContext);
  const handleClick = () => {
    setNavLateralState(!navLateral);
  };
  return (
    <ContainerHeader stateLateral={navLateral}>
      <ContainerMenuBurguer>
        <MenuBurguerIcon style={{ cursor: "pointer" }} onClick={handleClick} />
        <p>Cars Store</p>
      </ContainerMenuBurguer>
      
      <User
        style={{ cursor: "pointer" }}
        src={`${process.env.NEXT_PUBLIC_URL}/images/${userData.photo}`}
        name={userData.name}
      >
        {userData.username}
      </User>
    </ContainerHeader>
  );
};

export default HeaderDashboard;
