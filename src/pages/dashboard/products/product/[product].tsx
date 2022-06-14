import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import LayoutDashboard from "../../../../layout/Dashboard";
import { DATAPRODUCT } from "../../../../graphql/query/query.products";
import { Product as ProductType } from "../../../../models/ProductType";
import Loading from "../../../../components/loading";
import DataProduct from "../../../../components/dataProduct";
import { getCookie, removeCookie, setCookie } from "../../../../helpers/cookie";
import { redirect } from "../../../../helpers/function";
import { UserDataContext } from "../../../../context/userData";
import { LOGIN } from "../../../../graphql/query/query.login";
type Resp = {
  product: ProductType;
};
const Product = ({ token }: { token: string }) => {
  const router = useRouter();
  const productId = router.query.product;
  const [getProduct] = useLazyQuery<Resp>(DATAPRODUCT);
  const [dataProduct, setDataProduct] = useState<ProductType>();
  const [loadingProduct, setLoadingProduct] = useState(true);

  const { updateDataUser } = useContext(UserDataContext);
  const [getLogin] = useLazyQuery(LOGIN);

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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLogin, token]);
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

export async function getServerSideProps(ctx: any) {
  const jwt = getCookie("token", ctx.req);

  if (!jwt) {
    redirect({ location: "/login", ctx });
  }
  return {
    props: { token: jwt },
  };
}
export default Product;
