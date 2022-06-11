import { useRouter } from "next/router";
import { Table } from "@nextui-org/react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Property } from "../../models/PropertyType";
import renderCell from "./item";
import {
  DELETEPROPERTY,
  UPDATEPROPERTY,
} from "../../graphql/mutation/mutation.properties";
import { useContext, useEffect, useState } from "react";
import { PropertiesDataContext } from "../../context/propertiesContext";
import ModalProperty from "../modalProperty/index";
import { ALLPROPERTIES } from "../../graphql/query/query.properties";
type Props = {
  data?: Property[];
};
const columns = [
  { name: "NAME", uid: "name" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "ACTIONS", uid: "actions" },
];

export const PropertiesTable = ({ data }: Props) => {
  const route = useRouter();
  const { deleteProperty, updateDataProperties } = useContext(
    PropertiesDataContext
  );
  const [visibleModal, setVisibleModal] = useState(false);

  const [idPropertyedit, setIdPropertyedit] = useState("");
  const [editPorperty] = useMutation(UPDATEPROPERTY);
  const [nameNewProperty, setNameNewProperty] = useState("");
  const [errorNewProperty, setErrorNewProperty] = useState("");
  const [postDeleteProperty] = useMutation(DELETEPROPERTY);
  const [stateEdit, setStateEdit] = useState<boolean>(false);
  const [getProperties] = useLazyQuery(ALLPROPERTIES);

  useEffect(() => {
    if (!visibleModal) {
      setNameNewProperty("");
    }
  }, [visibleModal]);
  const onClickView = (property: string) => {
    route.push(`/dashboard/properties/property/${property}`);
  };
  const onClickEdit = (property: string) => {
    const nameProperty = data?.find((item: Property) => item._id === property);
    setNameNewProperty(nameProperty?.name!);
    setIdPropertyedit(property);
    setStateEdit(true);
    setVisibleModal(true);
  };
  const onClickDelete = async (property: string) => {
    const res = await postDeleteProperty({
      variables: { deletePropertyId: property },
    });

    if (res.data?.deleteProperty) {
      deleteProperty(property);
    }
  };

  const onclickEditProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameNewProperty === "") {
      return setErrorNewProperty("Name is required");
    }

    const resp = await editPorperty({
      variables: {
        name: nameNewProperty,

        updatePropertyId: idPropertyedit,
      },
    });
    if (resp.data.updateProperty) {
      const result = await getProperties();

      if (result.data?.properties) {
        updateDataProperties(result.data!.properties);
      }
      alert("update success");
    }


  };

  return (
    <>
      <Table
        aria-label="table properties"
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
          {(item: Property) => (
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
      {stateEdit && (
        <ModalProperty
          visibleModal={visibleModal}
          nameNewProperty={nameNewProperty}
          errorNewProperty={errorNewProperty}
          handleModalToggle={() => setVisibleModal(!visibleModal)}
          onSubmit={onclickEditProperty}
          setNameNewProperty={setNameNewProperty}
        />
      )}
    </>
  );
};

export default PropertiesTable;
