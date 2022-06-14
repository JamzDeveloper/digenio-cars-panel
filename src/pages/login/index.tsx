import { ContainerLogin, ContainerImages } from "../../styles/style.login";
import { useRouter } from "next/router";
import { SSRProvider } from "@react-aria/ssr";
import ImageGraph from "../../assets/svg/graph.svg";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { LOGIN } from "../../graphql/query/query.login";
import { useLazyQuery } from "@apollo/client";
import { Inputs, LoginType } from "../../types/types.login";
import FormLogin from "../../components/formLogin";
import { UserDataContext } from "../../context/userData";
import { getCookieFromBrowser, setCookie } from "../../helpers/cookie";

const Login = () => {
  const route = useRouter();
  const { updateDataUser } = useContext(UserDataContext);
  const [getLogin] = useLazyQuery<LoginType, Inputs>(LOGIN);
  useEffect(() => {
    const login = async () => {
      const token = getCookieFromBrowser("token");
      if (token) {
        getLogin({ variables: { username: "", password: "" } })
          .then((response) => {
            if (response.data) {
              setCookie("token", response.data.login.token);
              updateDataUser(response.data.login.user);
              route.push("/dashboard");
            }
          })
          .catch((e) => {
            localStorage.removeItem("Authorization");
          });
      }
    };
    login();
  }, []);
  return (
    <SSRProvider>
      <ContainerLogin>
        <ContainerImages>
          <Image src={ImageGraph} alt="img-Login" />
        </ContainerImages>
        <FormLogin></FormLogin>
      </ContainerLogin>
    </SSRProvider>
  );
};

export default Login;
