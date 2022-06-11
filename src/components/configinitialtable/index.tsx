import { Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ConfigInitial } from "../../models/ConfigInitialType";
import ModalConfigInitial from "../modalCofigInitial";
import renderCell from "./item/index";
import { useLazyQuery, useMutation } from "@apollo/client";
import { COFINGINITIAL } from "../../graphql/query/query.configinitial";
import {
  DELETECONFIGINITIAL,
  UPDATECONFIGINITIAL,
} from "../../graphql/mutation/mutation.configinitial";

const columns = [
  { name: "USER", uid: "user" },
  { name: "EMAIL", uid: "email" },
  { name: "NAME CONFIG", uid: "name" },
  { name: "CREDIT USER", uid: "initial_user_credits" },
  { name: "MOTHS LIMIT", uid: "initial_months_limit" },
  { name: "ACTIONS", uid: "actions" },
];

type Props = {
  data: ConfigInitial[];
  stateUpdate: boolean;
  setStateUpdate: Function;
};
const ConfigInitialTable = ({ data, setStateUpdate, stateUpdate }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [getConfigInitial] = useLazyQuery(COFINGINITIAL);
  const [dataUpdateConfigInitial, setDataUpdateConfigInitial] =
    useState<ConfigInitial | null>(null);
  const [postUpdateConfigInitial] = useMutation(UPDATECONFIGINITIAL);
  const [deleteConfigInitial] = useMutation(DELETECONFIGINITIAL);

  const onClickEdit = async (id: string) => {
    const res = await getConfigInitial();
    if (res.data.configInitial) {
      setDataUpdateConfigInitial({
        _id: res.data.configInitial._id,
        name: res.data.configInitial.name,
        initial_user_credits: res.data.configInitial.initial_user_credits,
        initial_months_limit: res.data.configInitial.initial_months_limit,
      });
    }
    setVisibleModal(!visibleModal);
  };
  const onClickDelete = async (id: string) => {
    const resp = await deleteConfigInitial({
      variables: {
        deleteConfigInitialId: id,
      },
    });
    if (resp.data.deleteConfigInitial) {
      alert("Delete Config Initial");
      setStateUpdate(!stateUpdate);
    }
  };

 

  const onclickEditConfigInitial = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (dataUpdateConfigInitial) {
      const { _id, ...rest } = dataUpdateConfigInitial;
      const res = await postUpdateConfigInitial({
        variables: {
          updateConfigInitialId: _id,
          data: {
            ...rest,
          },
        },
      });
      if (res.data?.updateConfigInitial) {
        alert("Update Config Initial");
        setStateUpdate(!stateUpdate);
      }
    }
  };

  return (
    <>
      <Table
        aria-label="teble users"
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
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={[...data]}>
          {(item: ConfigInitial) => (
            <Table.Row key={item._id}>
              {(columnKey: any) => (
                <Table.Cell>
                  {renderCell(
                    item,
                    columnKey,
                    onClickEdit,
                    onClickDelete,
                   
                  )}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <ModalConfigInitial
        visibleModal={visibleModal}
        handleModalToggle={() => setVisibleModal(!visibleModal)}
        onSubmit={onclickEditConfigInitial}
        dataConfigInitial={dataUpdateConfigInitial}
        setDataConfigInitial={setDataUpdateConfigInitial}
      />
    </>
  );
};

export default ConfigInitialTable;
