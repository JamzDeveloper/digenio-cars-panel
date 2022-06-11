import { useEffect, useState } from "react";
import Select from "react-select";
import { useLazyQuery } from "@apollo/client";
import { FileType } from "../../models/Types";
import { Group, Property, Value } from "../../models/PropertyType";
import { ALLPROPERTIES } from "../../graphql/query/query.properties";
import {
  Button,
  Modal,
  Input,
  Switch,
  Text,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import {
  Container,
  ContainerImage,
  ContainerColumnNewProperty,
  Form,
  InputFile,
  ContainerOption,
} from "./style";

type Props = {
  visibleModal: boolean;
  handleModalToggle: () => void;
  value: Value;
  setValue: Function;
  image: FileType;
  setImage: Function;
  handleSubmit: (e: React.FormEvent) => void;
  isEdit?: boolean;
};
type TypeSelect = {
  label: string;
  value: string;
};
const ModalValueProperty = ({
  visibleModal,
  handleModalToggle,

  value,
  setValue,
  image,
  setImage,
  handleSubmit,
  isEdit,
}: Props) => {
  const [getProperty, { data, error }] = useLazyQuery(ALLPROPERTIES);
  const [group, setGroup] = useState<Group>();
  const [properties, setProperties] = useState<TypeSelect[]>([]);
  const [stateSelectProperty, setStateSelectProperty] = useState<TypeSelect>();
  const [stateSelectValue, setStateSelectValue] = useState<TypeSelect>();
  const [valuesProperty, setValuesProperty] = useState<TypeSelect[]>([]);
  const [moreOptions, setMoreOptions] = useState<boolean>(false);

  useEffect(() => {
    const allProperties = async () => {
      const resp = await getProperty();
      if (resp.data) {
        const propertiesnew: TypeSelect[] = resp.data.properties.map(
          (property: Property) => {
            return {
              label: property.name,
              value: property._id,
            };
          }
        );

        setProperties(propertiesnew);
      }
    };

    allProperties();
  }, []);

  useEffect(() => {
    if (!moreOptions) {
      setValue({
        ...value,
        group: null,
      });
    }
  }, [moreOptions]);

  useEffect(() => {
    const propertyGroup = properties.find(
      (property: TypeSelect) => value.group?.property === property.value
    );

    const property = data?.properties.find(
      (property: Property) => property._id === propertyGroup?.value
    );
    const valuePropertySelect = property?.value?.find((item: Value) =>
      value.group?.value == item?._id
        ? {
            label: item.name,
            value: item._id,
          }
        : null
    );
    const values = property?.value?.map((value: Value) => {
      return {
        label: value.name,
        value: value._id,
      };
    });
    setValuesProperty(values as TypeSelect[]);
    setStateSelectProperty(propertyGroup);
    setStateSelectValue({
      label: valuePropertySelect?.name,
      value: valuePropertySelect?._id,
    });
  }, [isEdit, value]);

  const handleImage = (e: any) => {
    const file = (e.target as any).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage({ file: file, profileImg: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const deleteImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImage({ file: null, profileImg: null });
  };

  const handlePropertySelect = (selected: TypeSelect) => {
    setValue({
      ...value,
      group: {
        property: selected.value,
      },
    });
    setStateSelectProperty(selected);
    const property: Property = data.properties.find(
      (property: Property) => property._id === selected.value
    );
    const values = property?.value?.map((value) => {
      return {
        label: value.name,
        value: value._id,
      };
    });
    setValuesProperty(values as TypeSelect[]);
    setGroup({
      property: property._id,
    });
  };

  const handleValueSelect = (selected: TypeSelect) => {
    setStateSelectValue(selected);
    setGroup({
      ...group,
      value: selected.value,
    });
    setValue({
      ...value,
      group: {
        ...value.group,
        value: selected.value,
      },
    });
  };
  return (
    <Modal
      closeButton
      aria-labelledby="modal"
      open={visibleModal}
      onClose={handleModalToggle}
      width="700px"
    >
      <Modal.Header>
        <Text>New Property</Text>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ height: "100%" }} onSubmit={handleSubmit}>
          <Container>
            <ContainerColumnNewProperty style={{ height: "300px" }}>
              <ContainerImage>
                <Image
                  width={320}
                  height={180}
                  objectFit="contain"
                  src={
                    !image?.profileImg
                      ? "/images/Imagenotavailable.png"
                      : image?.profileImg
                  }
                  alt=""
                />
            
                {image?.file  || isEdit? <button onClick={deleteImage}>X</button> : null}
              </ContainerImage>
              <Button style={{ marginTop: "15px", padding: "0px" }}>
                <label
                  htmlFor="btn-file"
                  style={{ width: "316px", cursor: "pointer" }}
                >
                  Select File
                </label>
                <InputFile id="btn-file" onChange={handleImage} type={"file"} />
              </Button>
            </ContainerColumnNewProperty>

            <ContainerColumnNewProperty>
              <div>
                <Input
                  label="Name Value"
                  value={value?.name}
                  onChange={(e) => {
                    setValue({ ...value, name: e.target.value });
                  }}
                  placeholder="Name Value"
                />
              </div>
              <div>
                <Textarea
                  value={value?.description}
                  label="Description"
                  onChange={(e) =>
                    setValue({
                      ...value,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <ContainerOption>
                <label>Group</label>
                <Switch
                  checked={value.group?.property ? true : moreOptions}
                  onChange={(e) => {
                    setMoreOptions(!moreOptions);
                  }}
                />
              </ContainerOption>
            </ContainerColumnNewProperty>
          </Container>
          {!moreOptions && !value.group?.property ? null : (
            <Container style={{ width: "100%" }}>
              <ContainerOption>
                <label>Category</label>
                <Select
                  value={stateSelectProperty}
                  onChange={(e) => handlePropertySelect(e as TypeSelect)}
                  options={properties}
                />
              </ContainerOption>
              <ContainerOption>
                <label>Value</label>
                <Select
                  value={stateSelectValue}
                  onChange={(e) => handleValueSelect(e as TypeSelect)}
                  options={valuesProperty}
                />
              </ContainerOption>
            </Container>
          )}

          <Button type="submit" style={{ marginTop: "50px" }}>
            <Text color="#ffffff">Save</Text>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalValueProperty;
/*  const handleSutmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value?.name) {
      alert("Name is required");
      return;
    }
    if (!moreOptions) {
      const resp = await createNewValue({
        variables: {
          data: {
            ...value,
            slug: value?.name!.toLowerCase().replace(/ /g, "-"),
            group: null,
          },
          propertyId: propertyId, //,
          image: image?.file,
        },
      });

      if (resp.data) {
        alert("Property value created");
      }
    } else {
      if (value?.group?.property && !value?.group?.value) {
        return alert("Seleccione un valor");
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
    }

    setUpdateValues(!stateUpdateValues);

    setImage({ file: null, profileImg: null });
    setValue({
      name: "",
      description: "",
    });
  };*/
