import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";


import LayoutDashboard from "../../../../layout/Dashboard";
import { ContainerEdit, ContainerTittle } from "../../../../styles/style.user";

import { GETUSERPERSONALDATA } from "../../../../graphql/query/query.user";
import { useEffect } from "react";
import { User } from "../../../../models/UserType";

import ProductTable from "../../../../components/productTable/index";
import { Product } from "../../../../models/ProductType";

import FormEditUser from "../../../../components/formEditUser";
import Loading from "../../../../components/loading";

type UserPersonal = {
  getUserPersonal: User;
};

const EditUser = ({}) => {
  const router = useRouter();
  const userId = router.query.edit;

  const [getUser, { data, loading, error }] =
    useLazyQuery<UserPersonal>(GETUSERPERSONALDATA);

  useEffect(() => {
    const data = async () => {
      const data = await getUser({ variables: { getUserPersonalId: userId } });
    };

    data();
  }, [getUser, userId]);

  if (loading) {
    <Loading />;
  }

  return (
    <LayoutDashboard>
      <ContainerEdit>
        <ContainerTittle>
          <h2>Data personal</h2>
        </ContainerTittle>

        {loading ? <Loading /> : <FormEditUser data={data?.getUserPersonal} />}

        <ContainerTittle>
          <h2>Products</h2>
        </ContainerTittle>

        {loading ? (
          <Loading />
        ) : (
          <ProductTable
            data={(data?.getUserPersonal.products as Product[]) || []}
          />
        )}
      </ContainerEdit>
    </LayoutDashboard>
  );
};

export default EditUser;
