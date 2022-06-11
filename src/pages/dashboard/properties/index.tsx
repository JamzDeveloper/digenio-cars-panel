import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Modal, Grid, Input, Text } from "@nextui-org/react";
import Add from "../../../assets/svg-components/add";
import SearchIcon from "../../../assets/svg-components/Search";
import { Container, ContainerActions } from "../../../styles/style.properties";
import DashboardLayout from "../../../layout/Dashboard";
import { PropertiesDataContext } from "../../../context/propertiesContext";
import { ALLPROPERTIES } from "../../../graphql/query/query.properties";
import Loading from "../../../components/loading";
import PropertiesTable from "../../../components/propertiesTable";
import { NEWPROPERTY } from "../../../graphql/mutation/mutation.properties";
import { Property } from "../../../models/PropertyType";
import ModalProperty from "../../../components/modalProperty";

const Properties = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const router = useRouter();
  const [dataProperty, setDataProperty] = useState<Property[]>([]);
  const routerActual = router.pathname.split("/")[2];

  const { propertiesData, updateDataProperties } = useContext(
    PropertiesDataContext
  );
  const [getProperties, { loading }] = useLazyQuery(ALLPROPERTIES);
  const [newProperty] = useMutation(NEWPROPERTY);
  const [nameNewProperty, setNameNewProperty] = useState("");

  const [errorNewProperty, setErrorNewProperty] = useState("");
  useEffect(() => {
    const properties = async () => {
      const response = await getProperties();
      if (response.data?.properties) {
        updateDataProperties(response.data!.properties);
        setDataProperty(response.data!.properties);
      }
    };
    properties();
  }, [getProperties, updateDataProperties, propertiesData, newProperty]);

  const handleModalToggle = () => {
    setVisibleModal(!visibleModal);
  };
  const onclickNewProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameNewProperty === "") {
      return setErrorNewProperty("Name is required");
    }

    const resp = await newProperty({
      variables: {
        data: {
          name: nameNewProperty,
        },
      },
    });

    if (resp.data.createProperty) {
      updateDataProperties([...propertiesData, resp.data.createProperty]);
      setDataProperty([...propertiesData, resp.data.createProperty]);
      setNameNewProperty("");
      setErrorNewProperty("");
    }
  };
  const onChangesearch = (e: any) => {
    const newData = propertiesData.filter((item: Property) =>
      item!.name?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value === "") {
      setDataProperty(propertiesData);
    } else {
      setDataProperty(newData);
    }
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
              onChange={onChangesearch}
              contentRight={
                <SearchIcon
                  style={{ overflow: "hidden", cursor: "pointer" }}
                ></SearchIcon>
              }
            />
          </Grid>
          <Button icon={<Add color="#ffffff" />} onClick={handleModalToggle}>
            Add Property
          </Button>
        </ContainerActions>
        {loading ? <Loading /> : <PropertiesTable data={dataProperty} />}
      </Container>
      <ModalProperty
        visibleModal={visibleModal}
        handleModalToggle={handleModalToggle}
        onSubmit={onclickNewProperty}
        nameNewProperty={nameNewProperty}
        setNameNewProperty={setNameNewProperty}
        errorNewProperty={errorNewProperty}
      />
    </DashboardLayout>
  );
};

export default Properties;
