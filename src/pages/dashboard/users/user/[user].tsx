import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import LayoutDashboard from "../../../../layout/Dashboard";
import {
  ContainerViewUser,
  ContainerDataProducts,
  ContainerProductTitle,
} from "../../../../styles/style.user";
import { User } from "../../../../models/UserType";
import { GETUSERPERSONALDATA } from "../../../../graphql/query/query.user";
import { useEffect, useState } from "react";
import ProductTable from "../../../../components/productTable/index";
import { Product } from "../../../../models/ProductType";
import SimpleDataUser from "../../../../components/simpleDataUser";
import Loading from "../../../../components/loading";

type UserPersonal = {
  getUserPersonal: User;
};

const ViewUser = () => {
  const router = useRouter();
  const userId = router.query.user; 
  const [poducts, setProducts] = useState<Product[]>([]);
  const [getUser, { data, loading, error }] =
    useLazyQuery<UserPersonal>(GETUSERPERSONALDATA);

  useEffect(() => {
   
    getUser({ variables: { getUserPersonalId: userId } }).then(
      (response: any) => {
     
        setProducts(response.data.getUserPersonal.products);
      }
    );
  }, [getUser, userId]);

  return (
    <LayoutDashboard>
      <ContainerViewUser>
        {loading ? (
          <Loading />
        ) : (
          <SimpleDataUser user={data?.getUserPersonal} />
        )}
        <ContainerDataProducts>
          <ContainerProductTitle>
            {" "}
            <p>PRODUCTS</p>
          </ContainerProductTitle>
          {loading ? <Loading /> : <ProductTable data={poducts}></ProductTable>}
        </ContainerDataProducts>
      </ContainerViewUser>
    </LayoutDashboard>
  );
};
export default ViewUser;
