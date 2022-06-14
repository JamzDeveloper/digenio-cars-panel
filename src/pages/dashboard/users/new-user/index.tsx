import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import FormNewUser from "../../../../components/formNewUser";
import { UserDataContext } from "../../../../context/userData";
import { LOGIN } from "../../../../graphql/query/query.login";
import { getCookie, removeCookie, setCookie } from "../../../../helpers/cookie";
import { redirect } from "../../../../helpers/function";
import DashboardLayout from "../../../../layout/Dashboard";
import { Container,ContainerTittle } from "../../../../styles/style.user";
const NewUser = ({token}:{token:string}) => {
  const { updateDataUser } = useContext(UserDataContext);
  const [getLogin] = useLazyQuery(LOGIN);
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

  return (
    <DashboardLayout>
      <Container>
      <ContainerTittle>
          <h2>New User</h2>

        </ContainerTittle>
      <FormNewUser  />
      </Container>
    </DashboardLayout>
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
export default NewUser;
