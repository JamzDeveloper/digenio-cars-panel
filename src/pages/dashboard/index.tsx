import DashboardLayout from "../../layout/Dashboard";
import { redirect } from "../../helpers/function";
import { getCookie, removeCookie, setCookie } from "../../helpers/cookie.js";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../../graphql/query/query.login";
import { Inputs, LoginType } from "../../types/types.login";
import { useContext, useEffect } from "react";
import { UserDataContext } from "../../context/userData";
import { useRouter } from "next/router";
const Dashboard = ({ token }: { token: string }) => {
  const { updateDataUser } = useContext(UserDataContext);
  const [getLogin] = useLazyQuery<LoginType, Inputs>(LOGIN);
  const router = useRouter();
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

  return <DashboardLayout></DashboardLayout>;
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

export default Dashboard;
