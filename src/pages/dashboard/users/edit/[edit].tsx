import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";

import LayoutDashboard from "../../../../layout/Dashboard";
import { ContainerEdit, ContainerTittle } from "../../../../styles/style.user";

import { GETUSERPERSONALDATA } from "../../../../graphql/query/query.user";
import { useContext, useEffect } from "react";
import { User } from "../../../../models/UserType";

import ProductTable from "../../../../components/productTable/index";
import { Product } from "../../../../models/ProductType";

import FormEditUser from "../../../../components/formEditUser";
import Loading from "../../../../components/loading";
import { UserDataContext } from "../../../../context/userData";
import { LOGIN } from "../../../../graphql/query/query.login";
import { getCookie, removeCookie, setCookie } from "../../../../helpers/cookie";
import { redirect } from "../../../../helpers/function";

type UserPersonal = {
  getUserPersonal: User;
};

const EditUser = ({ token }: { token: string }) => {
  const router = useRouter();
  const userId = router.query.edit;

  const [getUser, { data, loading, error }] =
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
    const data = async () => {
      const data = await getUser({ variables: { getUserPersonalId: userId } });
    };

    data();
  }, [getUser, userId]);

  if (loading) {
    <Loading />;
  }

  return (
    <LayoutDashboard>
      <ContainerEdit>
        <ContainerTittle>
          <h2>Data personal</h2>
        </ContainerTittle>

        {loading ? <Loading /> : <FormEditUser data={data?.getUserPersonal} />}

        <ContainerTittle>
          <h2>Products</h2>
        </ContainerTittle>

        {loading ? (
          <Loading />
        ) : (
          <ProductTable
            data={(data?.getUserPersonal.products as Product[]) || []}
          />
        )}
      </ContainerEdit>
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
export default EditUser;
