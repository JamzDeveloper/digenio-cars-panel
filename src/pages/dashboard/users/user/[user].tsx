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
import { useContext, useEffect, useState } from "react";
import ProductTable from "../../../../components/productTable/index";
import { Product } from "../../../../models/ProductType";
import SimpleDataUser from "../../../../components/simpleDataUser";
import Loading from "../../../../components/loading";
import { getCookie, removeCookie, setCookie } from "../../../../helpers/cookie";
import { redirect } from "../../../../helpers/function";
import { UserDataContext } from "../../../../context/userData";
import { LOGIN } from "../../../../graphql/query/query.login";

type UserPersonal = {
  getUserPersonal: User;
};

const ViewUser = ({ token }: { token: string }) => {
  const router = useRouter();
  const userId = router.query.user;
  const [poducts, setProducts] = useState<Product[]>([]);
  const [getUser, { data, loading }] =
    useLazyQuery<UserPersonal>(GETUSERPERSONALDATA);
  const { updateDataUser } = useContext(UserDataContext);
  const [getLogin] = useLazyQuery(LOGIN);

  useEffect(() => {
    if (token) {
      getLogin({ variables: { username: "", password: "" } })
        .then((response) => {
          if (response.data) {
            setCookie("token", response.data.login.token);
            updateDataUser(response.data.login.user);
          }
        })
        .catch((e) => {
          removeCookie("token");
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLogin, token]);
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

export async function getServerSideProps(ctx: any) {
  const jwt = getCookie("token", ctx.req);

  if (!jwt) {
    redirect({ location: "/login", ctx });
  }
  return {
    props: { token: jwt },
  };
}
export default ViewUser;
