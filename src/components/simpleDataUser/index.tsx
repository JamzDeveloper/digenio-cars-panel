import { Image, Text } from "@nextui-org/react";

import { ContainerElementUserData, StyleProduct } from "./style";
import { SectionDataUser, ContainerDataUser, StateUser } from "./style";
import PhoneIcon from "../../assets/svg-components/Phone";
import EmailIcon from "../../assets/svg-components/Email";
import { User } from "../../models/UserType";
type Props = {
  user?: User;
};
const SimpleDataUser = ({ user }: Props) => {
  const countProduct = user?.products?.reduce((acc, product) => {
    if (product.state) {
      acc++;
    }
    return acc;
  }, 0);
  const countProductDelete = user?.products?.reduce((acc, product) => {
    if (product.saleStatus == "AVAILABLE") {
      acc++;
    }
    return acc;
  }, 0);
  const countProductSold = user?.products?.reduce((acc, product) => {
    if (product.saleStatus == "SOLD") {
      acc++;
    }
    return acc;
  }, 0);

  return (
    <SectionDataUser>
      <div>
        <Image
          showSkeleton
          width={320}
          height={180}
          maxDelay={20000}
          src={`${process.env.NEXT_PUBLIC_URL}/images/${user?.photo}`}
          alt="user photo"
        />
      </div>
      <ContainerDataUser>
        <ContainerElementUserData>
          <Text size={35} transform="capitalize">
            {user?.name}{" "}
          </Text>
          <StateUser state={user?.state as boolean}>
            {user?.state ? "Active Account" : "Deleted Account"}
          </StateUser>
        </ContainerElementUserData>

        <ContainerElementUserData>
          <div>
            <EmailIcon />
            <p> {user?.email}</p>
          </div>
          <div>
            <PhoneIcon width={20} />
            <p>
              <span>{user?.phone_number?.country_code}</span>{" "}
              {user?.phone_number?.number}
            </p>
          </div>
        </ContainerElementUserData>
        <ContainerElementUserData>
          <Text style={StyleProduct} transform="capitalize">
            Products : {countProduct}
          </Text>
          <Text style={StyleProduct} transform="capitalize">
            vailable products: {countProductDelete}
          </Text>
          <Text style={StyleProduct} transform="capitalize">
            Sold Product : {countProductSold}
          </Text>
        </ContainerElementUserData>
      </ContainerDataUser>
    </SectionDataUser>
  );
};
export default SimpleDataUser;
