import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import LayoutDashboard from "../../../../layout/Dashboard";
import { DATAPRODUCT } from "../../../../graphql/query/query.products";
import { Product as ProductType } from "../../../../models/ProductType";
import Loading from "../../../../components/loading";
import DataProduct from "../../../../components/dataProduct";
type Resp = {
  product: ProductType;
};
const Product = () => {
  const router = useRouter();
  const productId = router.query.product;
  const [getProduct, { data, loading, error }] =
    useLazyQuery<Resp>(DATAPRODUCT);
  const [dataProduct, setDataProduct] = useState<ProductType>();
  const [loadingProduct, setLoadingProduct] = useState(true);
  useEffect(() => {
    const dataProduct = async () => {
      setLoadingProduct(true);
      const resp = await getProduct({ variables: { productId: productId } });
      if (resp) {
        setDataProduct(resp.data?.product);
        setLoadingProduct(false);
      }
    };
    dataProduct();
  }, [productId, getProduct]);
  return (
    <LayoutDashboard>
      {loadingProduct ? <Loading /> : <DataProduct product={dataProduct!} />}
    </LayoutDashboard>
  );
};
export default Product;
