import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import LayoutDashboard from "../../../../layout/Dashboard";
import FormEditProduct from "../../../../components/formEditProduct";
import { useContext, useEffect } from "react";
import { DATAPRODUCT } from "../../../../graphql/query/query.products";
import { Product as ProductType } from "../../../../models/ProductType";
import { UserDataContext } from "../../../../context/userData";
import { LOGIN } from "../../../../graphql/query/query.login";
import { getCookie, removeCookie, setCookie } from "../../../../helpers/cookie";
import { redirect } from "../../../../helpers/function";
type Resp = {
  product: ProductType;
};
const EditProduct = ({ token }: { token: string }) => {
  const router = useRouter();
  const productId = router.query.edit;

  const [getProduct, { data, loading, error }] =
    useLazyQuery<Resp>(DATAPRODUCT);
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
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLogin, token]);

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

export async function getServerSideProps(ctx: any) {
  const jwt = getCookie("token", ctx.req);

  if (!jwt) {
    redirect({ location: "/login", ctx });
  }
  return {
    props: { token: jwt },
  };
}
export default EditProduct;
