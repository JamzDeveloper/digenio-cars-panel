import { Grid, Input, Textarea } from "@nextui-org/react";

import SelelectCustom from "../selectCustmon";
import { arrayCurrency } from "../../helpers/currency";
import { ColumnProduct, ContainerProduct, Form } from "./style";
import { ALLPROPERTIES } from "./query.graphql";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Property } from "../../models/PropertyType";
import { Props } from "./type";

type Properties = {
  category: string[];
  brand: string[];
  model: string[];
  body_type: string[];
  drive_type: string[];
  transmission: string[];
  fuel_type: string[];
};

const FormEditProduct = ({ product }: Props) => {
  const [getProperties, { data }] = useLazyQuery(ALLPROPERTIES);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesSelect, setPropertiesSelect] = useState<Properties>({
    category: [],
    brand: [],
    model: [],
    body_type: [],
    drive_type: [],
    transmission: [],
    fuel_type: [],
  });

  useEffect(() => {
    const data = async () => {
      const data = await getProperties();
      if (data) {
        setProperties(data?.data?.properties);
      }
    };
    data();
  }, [getProperties]);

  useEffect(() => {
    const ob: any = {
      category: [],
      brand: [],
      model: [],
      body_type: [],
      drive_type: [],
      transmission: [],
      fuel_type: [],
    };

    const valuePropertiesSelect = Object.keys(propertiesSelect);
    const valueProperties = valuePropertiesSelect.map((key) => {
      return key.toLocaleUpperCase();
    });

    if (properties) {
      properties.forEach((element) => {
        if (valueProperties.includes(element.name!.toLocaleUpperCase())) {
          const el = element.value?.map((ele) => {
            return ele.name;
          });
          //setPropertiesSelect({
          //  ...propertiesSelect,
          //  [`${element.name!.toLocaleLowerCase()}`]: el ?? [],
          //});

          ob[`${element.name!.toLocaleLowerCase()}`] = el ?? [];
        }
      });
    }
    setPropertiesSelect(ob);
  }, [data, properties]);
  return (
    <Form>
      <ContainerProduct>
        <ColumnProduct>
          <div
            style={{ width: "500px", height: "500px", background: "gray" }}
          ></div>
        </ColumnProduct>
        <ColumnProduct>
          <Input label="Name" placeholder="Name" initialValue={product?.name} />
          <Grid>
            <SelelectCustom
              label="Currency"
              valueInitial={`${product?.price?.currency}`}
              register={{}}
              option={arrayCurrency}
            />
            <Input
              label="Price"
              placeholder="Price"
              type={"number"}
              initialValue={product?.price?.value?.toString()}
            />
          </Grid>

          <SelelectCustom
            valueInitial={`${product?.saleStatus}`}
            option={["SALE", "AVAILABLE"]}
            register={{}}
            label="Sales Status"
          />
          <Textarea label="Description" initialValue={product?.description} />
        </ColumnProduct>
        <ColumnProduct>
          <SelelectCustom
            label="Category"
            valueInitial={`${product?.detail_product?.category?.name}`}
            register={{}}
            option={propertiesSelect.category}
          />

          <SelelectCustom
            label="Brand"
            valueInitial={`${product?.detail_product?.brand?.name}`}
            register={{}}
            option={propertiesSelect.brand}
          />
          <SelelectCustom
            label="Model"
            valueInitial={`${product?.detail_product?.model?.name}`}
            register={{}}
            option={propertiesSelect.model}
          />
          <Input
            label="Manufacturer"
            initialValue={product?.detail_product?.manufacturing_year?.toString()}
            type={"number"}
          />
          <Input
            label="Mileage"
            initialValue={product?.detail_product?.mileage?.toString()}
            type={"number"}
          />
          <SelelectCustom
            label="Body Type"
            valueInitial={`${product?.detail_product?.body_type?.name}`}
            register={{}}
            option={propertiesSelect.body_type}
          />
        </ColumnProduct>
        <ColumnProduct>
          <SelelectCustom
            label="Drive type"
            valueInitial={`${product?.detail_product?.drive_type?.name}`}
            register={{}}
            option={propertiesSelect.drive_type}
          />
          <Input
            label="Engine"
            initialValue={product?.detail_product?.engine?.toString()}
          />
          <SelelectCustom
            label="Transission"
            valueInitial={`${product?.detail_product?.transmission?.name}`}
            option={propertiesSelect.transmission}
            register={{}}
          />
          <SelelectCustom
            label="Fuel Type"
            valueInitial={`${product?.detail_product?.fuel_type?.name}`}
            register={{}}
            option={propertiesSelect.fuel_type}
          />
          <Input
            label="City Mpg"
            initialValue={product?.detail_product?.city_mpg?.toString()}
            type={"number"}
          />
        </ColumnProduct>
        <ColumnProduct>
          <Input
            label="HighWay Mpg"
            initialValue={product?.detail_product?.highway_mpg?.toString()}
            type={"number"}
          />
          <Input
            label="Interior Color"
            initialValue={product?.detail_product?.interior_color}
          />
          <Input
            label="Exterior Color"
            initialValue={product?.detail_product?.exterior_color}
          />
          <Input label="Vin" initialValue={product?.detail_product?.vin} />
          <Input
            label="Condition"
            initialValue={product?.detail_product?.condition}
          />
        </ColumnProduct>
      </ContainerProduct>
    </Form>
  );
};
export default FormEditProduct;
