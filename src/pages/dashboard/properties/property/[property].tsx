import { useState, useEffect } from "react";
import DashboardLayout from "../../../../layout/Dashboard";
import { Container, ContainerActions } from "../../../../styles/style.properties";
import Add from "../../../../assets/svg-components/add";
import SearchIcon from "../../../../assets/svg-components/Search";
import ValuePropertyTable from "../../../../components/valuePropertyTable";
import { Button, Grid, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { NEWPROPERTYVALUE } from "../../../../graphql/mutation/mutation.properties";
import ModalValueProperty from "../../../../components/modalValueProperty";
import { Value } from "../../../../models/PropertyType";
import { FileType } from "../../../../models/Types";

const Property = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [updateValues, setUpdateValues] = useState(false);
  const route = useRouter();
  const propertyId = route.query.property;

  const handleModalToggle = () => {
    setVisibleModal(!visibleModal);
  };

  const [createNewValue] = useMutation(NEWPROPERTYVALUE);
  const [value, setValue] = useState<Value>({});
  const [image, setImage] = useState<FileType>({} as FileType);

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
        <ValuePropertyTable updateValupePeroperty={updateValues} />
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

export default Property;
