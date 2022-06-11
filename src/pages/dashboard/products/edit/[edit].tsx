import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import LayoutDashboard from "../../../../layout/Dashboard";
import FormEditProduct from "../../../../components/formEditProduct";
import { useEffect } from "react";
import { DATAPRODUCT } from "../../../../graphql/query/query.products";
import { Product as ProductType } from "../../../../models/ProductType";
type Resp = {
  product: ProductType;
};
const EditProduct = () => {
  const router = useRouter();
  const productId = router.query.edit;

  const [getProduct, { data, loading, error }] =
    useLazyQuery<Resp>(DATAPRODUCT);

  useEffect(() => {
    const data = async () => {
      const data = await getProduct({ variables: { productId: productId } });
      if (data) {
        console.log(data);
      }
    };

    data();
  }, [getProduct, productId]);
  return (
    <LayoutDashboard>
      <FormEditProduct product={data?.product!} />
    </LayoutDashboard>
  );
};

export default EditProduct;
