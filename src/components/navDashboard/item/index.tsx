import Link from "next/link";
import { ContainerItemLi, ContainerLinkitem, LinkP } from "./style";
import { Props } from "./types";

const ItemNav = ({
  stateRoute,
  href,
  
  onchangeRoute,
  navLateral,
  Icon,
  text,
  nameRoute,
}: Props) => {
  return (
    <ContainerItemLi stateRoute={stateRoute}>
      <Link href={href} passHref>
        <ContainerLinkitem onClick={() => onchangeRoute(nameRoute)}>
          <Icon
            color={stateRoute ? " #0070F3" : "#fff"}
            height={30}
            width={30}
          />
          <LinkP stateNavbar={navLateral} stateRoute={stateRoute}>
            {text}
          </LinkP>
        </ContainerLinkitem>
      </Link>{" "}
    </ContainerItemLi>
  );
};

export default ItemNav;
