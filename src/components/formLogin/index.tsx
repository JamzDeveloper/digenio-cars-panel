import { useContext } from "react";
import { useId } from "@react-aria/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Input, Grid, Button, Loading } from "@nextui-org/react";
import { Inputs, LoginType } from "../../types/types.login";
import { LOGIN } from "../../graphql/query/query.login";
import UserAvatar from "../../assets/svg-components/Avatar";
import PadLock from "../../assets/svg-components/PadLock";
import { RecoveryPassword } from "./style";
import {
  Form,
  FormContainer,
  FormLayout,
  LabelInput,
  TitleForm,
  ErrorInput,
} from "./style";
import { UserDataContext } from "../../context/userData";
import { setCookie } from "../../helpers/cookie";

export const FormLogin = (): JSX.Element => {
  const id = useId();
  const { userData, updateDataUser } = useContext(UserDataContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [getLogin, { loading, error, data }] = useLazyQuery<LoginType, Inputs>(
    LOGIN
  );

  const onSubmit: SubmitHandler<Inputs> = async (dataInput: Inputs) => {
    try {
      getLogin({ variables: dataInput }).then((response) => {
        if (response.data) {
          router.push("/dashboard");
          // localStorage.setItem("Authorization", response.data.login.token);
          setCookie("token",  response.data.login.token)
          updateDataUser(response.data.login.user);
        }
      });
    } catch (err) {}
  };
  return (
    <FormLayout id={id}>
      <FormContainer id={useId()}>
        <TitleForm id={useId()}>Welcome Back 🙂</TitleForm>

        <Form method="POST" id={useId()} onSubmit={handleSubmit(onSubmit)}>
          <Grid.Container
            id={useId()}
            gap={3}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Grid
              id={useId()}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <LabelInput id={useId()}>Email or Username</LabelInput>
              <Input
                id={useId()}
                aria-label="email or username"
                size="lg"
                type={"text"}
                rounded
                bordered
                placeholder="example@gmail.com"
                color="primary"
                style={{ width: "100% !important" }}
                contentLeft={
                  <UserAvatar style={{ overflow: "inherit", cursor: "text" }} />
                }
                {...register("username", { required: true })}
              ></Input>
              {errors.username && (
                <ErrorInput>Username es requerido</ErrorInput>
              )}
            </Grid>

            <Grid
              id={useId()}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <LabelInput id={useId()}>Password</LabelInput>
              <Input.Password
                id={useId()}
                aria-label="password"
                size="lg"
                rounded
                bordered
                color="primary"
                type="password"
                placeholder="******"
                style={{ width: "100%" }}
                contentLeft={
                  <PadLock style={{ overflow: "inherit", cursor: "text" }} />
                }
                {...register("password", { required: true })}
              ></Input.Password>
              {errors.password && (
                <ErrorInput>Password es requerido</ErrorInput>
              )}
            </Grid>

            <Grid id={useId()} style={{ marginTop: "10px" }}>
              <Button
                id={useId()}
                aria-label="Recovery password"
                style={{ width: "100%" }}
                type="submit"
              >
                {loading ? (
                  <Loading type="spinner" color="currentColor" size="sm" />
                ) : (
                  " Log In"
                )}
              </Button>
            </Grid>
          </Grid.Container>
        </Form>

        <RecoveryPassword id={useId()}>
          Olvidaste tu clave?{" "}
          <a href="#">
            <u>Recuperala aqui</u>
          </a>
        </RecoveryPassword>
      </FormContainer>
    </FormLayout>
  );
};

export default FormLogin;
