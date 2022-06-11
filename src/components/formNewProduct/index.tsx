import { Button, Grid, Input, Switch, Text, Textarea } from "@nextui-org/react";
import Image from "next/image";
import Select from "react-select";
import { useState, useEffect } from "react";
import {
  ColumnNewProduct,
  ContainerImage,
  ContainerNewProduct,
  ContainerOption,
  Form,
  InputFile,
} from "./style";
import { useForm } from "react-hook-form";
import { arrayCurrency } from "../../helpers/currency";
import { DetailProduct, Product, Value } from "../../models/ProductType";
import { FileTypeInput as FileType } from "../../models/Types";
import SelelectCustom from "../selectCustmon";

import { useLazyQuery } from "@apollo/client";
import { ALLPROPERTIES } from "../../graphql/query/query.properties";
import {
  PropertiesSelect,
  PropertiesSelectOptions,
} from "../../helpers/helpers.properties";
import { Property } from "../../models/PropertyType";

type MutationDetailProduct = {
  name: string | null;
  value: string | null;
};

const initialPropertySelect = {
  category: {
    id: "",
    value: [] as PropertiesSelectOptions[],
  },
  brand: {
    id: "",
    value: [] as PropertiesSelectOptions[],
  },
  model: {
    id: "",
    value: [] as PropertiesSelectOptions[],
  },
  body_type: {
    id: "",
    value: [] as PropertiesSelectOptions[],
  },
  drive_type: {
    id: "",
    value: [] as PropertiesSelectOptions[],
  },
  transmission: {
    id: "",
    value: [] as PropertiesSelectOptions[],
  },
  fuel_type: {
    id: "",
    value: [] as PropertiesSelectOptions[],
  },
};
const FormNewProduct = () => {
  const [image, setImage] = useState<FileType>();



  //saved data of property values to render
  const [propertiesSelect, setPropertiesSelect] = useState<PropertiesSelect>(
    initialPropertySelect
  );
  const [model, setModel] = useState<MutationDetailProduct|null>({
    name: null,
    value: null,
  });
  const [stateGroupProperty, setStateGroupProperty] = useState({
    property: "",
    value: "",
  });

  // const [property, setProperty] = useState<DetailProduct>();
  const [getProperties, { data }] = useLazyQuery(ALLPROPERTIES);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    const getPropertiesData = async () => {
      const response = await getProperties();
      if (response.data.properties) {
        //console.log("data", response.data.properties);
      }
    };
    getPropertiesData();
  }, []);

  useEffect(() => {
    const obj: any = initialPropertySelect;
    const valueProperties = Object.keys(propertiesSelect).map((key) => {
      return key.toLocaleLowerCase();
    });

    if (data?.properties) {
      data.properties.forEach((element: Property) => {
        if (valueProperties.includes(element.name!.toLocaleLowerCase())) {
          if (element.name == "MODEL") {
            return (obj[`${element.name!.toLocaleLowerCase()}`] = {
              id: element._id,
              value: [],
            });
          }
          const el = element.value?.map((ele) => {
            return { label: ele.name?.toLocaleUpperCase(), value: ele._id };
          });

          obj[`${element.name!.toLocaleLowerCase()}`] = {
            id: element._id,
            value: el,
          };
        }
      });
    }
    setPropertiesSelect(obj);
  }, [data]);

  useEffect(() => {
    setModel(null);
    setPropertiesSelect({
      ...propertiesSelect,
      model: {
        id: propertiesSelect.model.id,
        value: [],
      },
    });
    if (data?.properties) {
      let dataModel: PropertiesSelectOptions[] =
        [] as PropertiesSelectOptions[];
      data.properties.forEach((element: Property) => {
        if (element._id == propertiesSelect.model.id) {
          dataModel = element.value?.reduce((acc: any, curr: any) => {
            if (
              curr.group?.property === stateGroupProperty.property &&
              curr.group?.value === stateGroupProperty.value
            ) {
              acc.push({
                label: curr.name?.toLocaleUpperCase(),
                value: curr._id,
              });
            }
            return acc;
          }, [] as PropertiesSelectOptions[]);
       
        }
      });
      setPropertiesSelect({
        ...propertiesSelect,
        model: {
          id: propertiesSelect.model.id,
          value: dataModel,
        },
      });
    }
  }, [stateGroupProperty]);
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
  const onSubmit = async (dataInput: Product) => {
    console.log(dataInput);
    if (dataInput) {
      console.log(dataInput);
    }
  };

  const onchangeprueba = (e: any) => {
    console.log(e);
  };

  const handleModelChange = (e: any) => {
    setModel({ name: e.label, value: e.value });
  };
  return (
    <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <ContainerNewProduct>
        <ColumnNewProduct>
          <ContainerImage>
            <Image
              width={320}
              height={180}
              objectFit="cover"
              src={
                !image?.profileImg
                  ? "/images/Imagenotavailable.png"
                  : image?.profileImg
              }
              alt=""
            />
            {image?.file ? <button onClick={deleteImage}>X</button> : null}
          </ContainerImage>
          <Button style={{ marginTop: "15px" }}>
            <label htmlFor="btn-file">Select File</label>
            <InputFile id="btn-file" onChange={handleImage} type={"file"} />
          </Button>
        </ColumnNewProduct>
        <ColumnNewProduct>
          <Input clearable label="Name" placeholder="Name" />

          <Grid>
            <SelelectCustom
              label="Currency"
              valueInitial={`USD`}
              register={{ ...register("price.currency", { required: true }) }}
              option={arrayCurrency}
            />
            <Input
              label="Price"
              placeholder="Price"
              type={"number"}
              {...register("price.value", { required: true })}
            />
          </Grid>
          <ContainerOption>
            <label>Negotiated</label>
            <Switch></Switch>
          </ContainerOption>
        </ColumnNewProduct>
        <ColumnNewProduct>
          <SelelectCustom
            valueInitial={`AVAILABLE`}
            option={["SALE", "AVAILABLE"]}
            register={{ ...register("saleStatus", { required: true }) }}
            label="Sales Status"
          />
          <ContainerOption>
            <label>Featured</label>
            <Switch initialChecked={false}></Switch>
          </ContainerOption>
          <Textarea
            label="Description"
            {...register("description", { required: true })}
          />
        </ColumnNewProduct>
      </ContainerNewProduct>
      <ContainerNewProduct>
        <ColumnNewProduct>
          <ContainerOption>
            <label> Category</label>
            <Select
              onChange={onchangeprueba}
              options={propertiesSelect.category.value}
            />
          </ContainerOption>
          <ContainerOption>
            <label> Brand</label>
            <Select
              onChange={(e) => {
                setStateGroupProperty({
                  property: propertiesSelect.brand.id,
                  value: e?.value!,
                });
              }}
              options={propertiesSelect.brand.value!}
            />
          </ContainerOption>

          <ContainerOption>
            <label> Model</label>

            <Select
              value={
                propertiesSelect.model.value.length == 0
                  ? null
                  : { label: model?.name, value: model?.value }
              }
              onChange={handleModelChange}
              options={propertiesSelect.model.value!}
            />
          </ContainerOption>
          <Input label="Manufacturer" type={"number"} />
          <Input label="Mileage" type={"number"} />
          <ContainerOption>
            <label> Body Type</label>
            <Select
              onChange={onchangeprueba}
              options={propertiesSelect.body_type.value!}
            />
          </ContainerOption>
        </ColumnNewProduct>
        <ColumnNewProduct>
          <ContainerOption>
            <label> Drive Type</label>
            <Select
              onChange={onchangeprueba}
              options={propertiesSelect.drive_type.value!}
            />
          </ContainerOption>
          <Input label="Engine" placeholder="Engine" />

          <ContainerOption>
            <label> Transission</label>
            <Select
              onChange={onchangeprueba}
              options={propertiesSelect.transmission.value!}
            />
          </ContainerOption>
          <ContainerOption>
            <label>Fuel Type</label>
            <Select
              onChange={onchangeprueba}
              options={propertiesSelect.fuel_type.value!}
            />
          </ContainerOption>

          <Input label="City Mpg" type={"number"} />
        </ColumnNewProduct>
        <ColumnNewProduct>
          <Input label="HighWay Mpg" type={"number"} />
          <Input label="Interior Color" />
          <Input label="Exterior Color" />
          <Input label="Vin" />
          <Input label="Condition" />
        </ColumnNewProduct>
      </ContainerNewProduct>
      <Button type="submit">
        <Text>Save</Text>
      </Button>
    </Form>
  );
};

export default FormNewProduct;
