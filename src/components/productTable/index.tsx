import { useRouter } from "next/router";
import { Table } from "@nextui-org/react";
import renderCell from "./item";
import { Product } from "../../models/ProductType";
import { DELETEPRODUCT } from "./mutation.graphql";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { ProductsDataContext } from "../../context/productsContext";
type Props = {
  data: Product[];
};
export const ProductTable = ({ data }: Props) => {
  const route = useRouter();
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "PUBLISHER", uid: "publisher" },
    { name: "PRICE", uid: "price" },
    { name: "USER", uid: "user" },
    { name: "NEGOTIATED", uid: "negotiated" },
    { name: "STATE SALE", uid: "saleStatus" },
    { name: "STATUS", uid: "state" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const [deleteProduct] = useMutation(DELETEPRODUCT);
  const { updateDataProducts } = useContext(ProductsDataContext);

  const onClickView = (product: Product) => {
    route.push(`/dashboard/products/product/${product}`);
  };
  const onClickEdit = (product: Product) => {
    route.push(`/dashboard/products/edit/${product}`);
  };
  const onClickDelete = async (productId: string) => {
    const resp = await deleteProduct({
      variables: {
        deleteProductId: productId,
      },
    });
    if (resp) {
      let carm = [...data];
      const newData = carm.map((item) => {
        if (item._id === productId) {
          return { ...item, state: !item.state };
        }
        return item;
      });

      updateDataProducts(newData);
    }
  };

  return (
    <Table
      aria-label="table products"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column: any) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name.toLocaleUpperCase()}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={data}>
        {(item: Product) => (
          <Table.Row key={item._id}>
            {(columnKey: any) => (
              <Table.Cell>
                {renderCell(
                  item,
                  columnKey,
                  onClickView,
                  onClickEdit,
                  onClickDelete
                )}
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={10}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  );
};

export default ProductTable;
