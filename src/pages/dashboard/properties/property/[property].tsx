import { useState, useEffect, useContext } from "react";
import DashboardLayout from "../../../../layout/Dashboard";
import {
  Container,
  ContainerActions,
} from "../../../../styles/style.properties";
import Add from "../../../../assets/svg-components/add";
import SearchIcon from "../../../../assets/svg-components/Search";
import ValuePropertyTable from "../../../../components/valuePropertyTable";
import { Button, Grid, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { NEWPROPERTYVALUE } from "../../../../graphql/mutation/mutation.properties";
import ModalValueProperty from "../../../../components/modalValueProperty";
import { Value } from "../../../../models/PropertyType";
import { FileType } from "../../../../models/Types";
import { getCookie, removeCookie, setCookie } from "../../../../helpers/cookie";
import { redirect } from "../../../../helpers/function";
import { UserDataContext } from "../../../../context/userData";
import { LOGIN } from "../../../../graphql/query/query.login";

const Property = ({ token }: { token: string }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [updateValues, setUpdateValues] = useState(false);
  const [search,setSearch] = useState("");
  const route = useRouter();
  const propertyId = route.query.property;

  const handleModalToggle = () => {
    setVisibleModal(!visibleModal);
  };

  const [createNewValue] = useMutation(NEWPROPERTYVALUE);
  const [value, setValue] = useState<Value>({});
  const [image, setImage] = useState<FileType>({} as FileType);
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
  const handleSutmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value?.name) {
      alert("Name is required");
      return;
    }

    const resp = await createNewValue({
      variables: {
        data: {
          ...value,
          slug: value?.name!.toLowerCase().replace(/ /g, "-"),
        },
        propertyId: propertyId, //,
        image: image?.file,
      },
    });
    if (resp.data) {
      alert("Property value created");
    }

    setImage({ file: null, profileImg: null });
    setValue({});
    setUpdateValues(!updateValues);
  };
  return (
    <DashboardLayout>
      <ContainerActions>
        <Grid>
          <Input
            aria-label="Search"
            size="lg"
            width="400px"
            type="text"
            placeholder="Search"
            onChange={(e)=>{setSearch(e.target.value)}}
            contentRight={
              <SearchIcon
                style={{ overflow: "hidden", cursor: "pointer" }}
              ></SearchIcon>
            }
          />
        </Grid>
        <Button icon={<Add color="#ffffff" />} onClick={handleModalToggle}>
          Add Value
        </Button>
      </ContainerActions>
      <Container>
        <ValuePropertyTable updateValupePeroperty={updateValues} searchValue={search}/>
      </Container>

      <ModalValueProperty
        visibleModal={visibleModal}
        handleModalToggle={handleModalToggle}
        value={value}
        setValue={setValue}
        image={image}
        setImage={setImage}
        handleSubmit={handleSutmit}
      />
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
export default Property;
