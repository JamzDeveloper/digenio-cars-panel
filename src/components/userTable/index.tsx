import { useEffect, useContext, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Table } from "@nextui-org/react";
import renderCell from "./item";
import { User } from "../../models/UserType";
import { ALLUSERS } from "./query.graphql";
import { UsersDataContext } from "../../context/usersData";
import { useRouter } from "next/router";
import Loading from "../loading/index";
import { UPDATEUSER } from "./mutation.graphql";

type AllUsersTtype = {
  allUsers: User[];
};
const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "PUBLICATION LIMIT", uid: "publication_limit" },
  { name: "CREDITS", uid: "credits" },
  { name: "ROLE", uid: "type_user" },
  { name: "STATUS", uid: "state" },
  { name: "ACTIONS", uid: "actions" },
];
type Props = {
  search?: string;
  valueFilter?: string;
};

const UserTable = ({ search, valueFilter }: Props) => {
  const router = useRouter();

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const [getUsers, { data, loading, error }] =
    useLazyQuery<AllUsersTtype>(ALLUSERS);

  const { usersData, updateDataUsers, updateOneUser } =
    useContext(UsersDataContext);

  const [saveUser] = useMutation(UPDATEUSER);

  useEffect(() => {
    if (usersData.length === 0) {
      getUsers().then((response) => {
        if (response.data?.allUsers) {
          updateDataUsers(response.data?.allUsers);
        }
      });
    }

    setAllUsers(usersData);
  }, [getUsers, updateDataUsers, usersData]);

  //metodo de busqueda
  useEffect(() => {
    if (search == "" && valueFilter == "ALL") {
      setAllUsers(usersData);
    }

    if (search !== "" && search !== undefined && valueFilter == "ALL") {
      let allUsers: User[] = usersData.filter((user) => {
        return user.name!.toLowerCase().includes(search.toLowerCase());
      });

      setAllUsers(allUsers);
    }

    if (valueFilter !== "ALL" && search != "") {
      let allUsers: User[] = usersData.filter((user) => {
        return (
          user.name!.toLowerCase().includes(search!.toLowerCase()) &&
          user.type_user == valueFilter
        );
      });
      setAllUsers(allUsers);
    }

    if (valueFilter !== "ALL" && valueFilter !== undefined && search == "") {
      let allUsers: User[] = usersData.filter((user) => {
        return user.type_user === valueFilter;
      });
      setAllUsers(allUsers);
    }
  }, [search, data, usersData, valueFilter]);

  const onClickEdit = (userId: string) => {
    router.push(`/dashboard/users/edit/${userId}`);
  };

  const onClickDelete = async (userId: string) => {
    let user = usersData.find((user: User) => user._id === userId);
    try {
      const res = await saveUser({
        variables: {
          updateUserByAdminId: `${userId}`,
          data: {
            state: !user?.state,
          },
        },
      });
      if (res.data) {
        updateOneUser(res.data.updateUserByAdmin);
      }
    } catch (e) {}
  };
  const onClickView = (userId: string) => {
    router.push(`/dashboard/users/user/${userId}`);
  };
  if (loading) return <Loading />;

  return (
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
      <Table.Body items={allUsers}>
        {(item: User) => (
          <Table.Row key={item._id}>
            {(columnKey: any) => (
              <Table.Cell>
                {renderCell(
                  item,
                  columnKey,
                  onClickEdit,
                  onClickDelete,
                  onClickView
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

export default UserTable;
