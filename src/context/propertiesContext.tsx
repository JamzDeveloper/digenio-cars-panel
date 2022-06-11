import React from "react";
import { Property } from "../models/PropertyType";

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ContextType = {
  propertiesData: Property[];
  updateDataProperties: (data: Property[]) => void;
  oneProperty: (property: string) => Property | undefined;
  deleteProperty: (property: string) => void;
};

const PropertiesDataContext = React.createContext<ContextType>(
  {} as ContextType
);

const { Provider } = PropertiesDataContext;

const PropertiesDataProvider = ({ children }: Props) => {
  const [propertiesData, setPropertiesData] = React.useState<Property[]>([]);

  const updateDataProperties = (data: Property[]) => {
    setPropertiesData(data);
  };
  const oneProperty = (property: string) => {
    const result = propertiesData.find((property) => property._id == property);

    return result;
  };
  const deleteProperty = (property: string) => {
    const newPropertiesData = propertiesData.filter(
      (property) => property._id != property
    );

    setPropertiesData(newPropertiesData);
  };

  const content: ContextType = {
    propertiesData,
    updateDataProperties,
    oneProperty,
    deleteProperty,
  };
  return <Provider value={content}>{children}</Provider>;
};

export { PropertiesDataContext, PropertiesDataProvider };
