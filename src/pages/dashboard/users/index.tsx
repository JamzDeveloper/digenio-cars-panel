import { Button, Grid, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import Add from "../../../assets/svg-components/add";
import UserTable from "../../../components/userTable";
import DashboardLayout from "../../../layout/Dashboard";
import { Container, ContainerActions } from "../../../styles/style.user";
import SearchIcon from "../../../assets/svg-components/Search";
import { useContext, useEffect, useState } from "react";
import SelectFilter from "../../../components/selectFilter/index";
import { getCookie, removeCookie, setCookie } from "../../../helpers/cookie";
import { redirect } from "../../../helpers/function";
import { UserDataContext } from "../../../context/userData";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../../../graphql/query/query.login";

const Users = ({ token }: { token: string }) => {
  const router = useRouter();
  const routerActual = router.pathname.split("/")[2];
  const [search, setSearch] = useState("");
  const [valueFilter, setValueFilter] = useState("ALL");
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
  const onclickAdd = () => {
    router.push("/dashboard/users/new-user");
  };

  return (
    <DashboardLayout routeActual={routerActual}>
      <Container>
        <ContainerActions>
          <Grid>
            <Input
              aria-label="Search"
              size="lg"
              width="400px"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              contentRight={
                <SearchIcon
                  style={{ overflow: "hidden", cursor: "pointer" }}
                ></SearchIcon>
              }
            />
          </Grid>

          <SelectFilter
            setValueFilter={setValueFilter}
            valueInitial="ALL"
            options={["ALL", "ADMIN", "USER", "SUPER_ADMIN", "WRITER"]}
          />

          <Button icon={<Add color="#ffffff" />} onClick={onclickAdd}>
            Add User
          </Button>
        </ContainerActions>
        <UserTable valueFilter={valueFilter} search={search}></UserTable>
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

export default Users;
