import React from "react";
import { Product } from "../models/ProductType";

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ContextType = {
  productsData: Product[];
  updateDataProducts: (data: Product[]) => void;
};

const ProductsDataContext = React.createContext<ContextType>({} as ContextType);

const { Provider } = ProductsDataContext;

const ProductsDataProvider = ({ children }: Props) => {
  const [productsData, setProductsData] = React.useState<Product[]>([]);

  const updateDataProducts = (data: Product[]) => {
    
    setProductsData(data);
  };

  const content: ContextType = {
    productsData,
    updateDataProducts,
  };
  return <Provider value={content}>{children}</Provider>;
};

export { ProductsDataContext, ProductsDataProvider };
