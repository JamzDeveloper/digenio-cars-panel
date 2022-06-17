import { Table } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ONEPROPERTY } from "../../graphql/query/query.properties";
import { Value, Group } from "../../models/PropertyType";
import renderCell from "./item";
import Loading from "../loading";
import {
  DELETEPROPERTYVALUE,
  UPDATEPROPERTYVALUE,
} from "../../graphql/mutation/mutation.properties";
import ModalValueProperty from "../modalValueProperty/index";
import { FileType } from "../../models/Types";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "SLUG", uid: "slug" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "ACTIONS", uid: "actions" },
];

type Props = {
  updateValupePeroperty?: boolean;
  searchValue?: string;
};

const ValuePropertyTable = ({ updateValupePeroperty, searchValue }: Props) => {
  const router = useRouter();
  const propertyId = router.query.property;
  const [postUpdateValue] = useMutation(UPDATEPROPERTYVALUE);
  const [getProperty, { loading, data }] = useLazyQuery(ONEPROPERTY);
  const [visibleModal, setVisibleModal] = useState(false);
  const [deleteProperty] = useMutation(DELETEPROPERTYVALUE);
  const [values, setValues] = useState<Value[]>([] as Value[]);
  const [valueEdit, setValueEdit] = useState<Value>({});
  const [image, setImage] = useState<FileType>({} as FileType);
  const [isEdit, setIsEdit] = useState(false);
  const [updateValues, setUpdateValues] = useState(false);

  useEffect(() => {
    const property = async () => {
      const response = await getProperty({
        variables: { propertyId: propertyId },
      });
      if (response.data.property) {
        setValues(response.data.property.value);
      }
    };
    property();
  }, [
    propertyId,
    deleteProperty,
    getProperty,
    updateValupePeroperty,
    updateValues,
  ]);

  useEffect(() => {
    if (searchValue && searchValue.length > 0) {
      const dataFilter = data.property.value.filter((item: any) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setValues(dataFilter);
    }
    if (data?.property.value && searchValue == "") {
      setValues(data.property.value);
    }
  }, [data?.property.value, searchValue]);

  const onClickEdit = (id: string) => {
    const oneValue = values.find((item: Value) => item._id === id);

    if (oneValue?.image) {
      setImage({
        file: null,
        profileImg: `${process.env.NEXT_PUBLIC_URL}/images/${oneValue?.image}`,
      });
    }
    setValueEdit({ ...oneValue });
    setIsEdit(!isEdit);
    setVisibleModal(true);
  };

  const onClickDelete = async (id: string) => {
    const result = await deleteProperty({
      variables: { propertyId: propertyId, valueId: id },
    });

    if (result) {
      const response = await getProperty({
        variables: { propertyId: propertyId },
      });
      if (response.data.property) {
        setValues(response.data.property.value);
      }
      alert(`Value ${id} deleted`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!valueEdit?.name) {
      alert("Name is required");
      return;
    }
    const { _id } = valueEdit;

    const data = {
      name: valueEdit?.name,
      slug: valueEdit?.name?.toLowerCase().replace(/ /g, "-"),
      description: valueEdit?.description,
      group: {
        property: valueEdit.group?.property,
        value: valueEdit.group?.value,
      },
    };

    let resp;

    if (image.file) {
      resp = await postUpdateValue({
        variables: {
          propertyId: propertyId,
          valueId: _id,
          data: {
            ...data,
            slug: data.name!.toLowerCase().replace(/ /g, "-"),
          },
          image: image.file,
        },
      });
    }
    if ((!image.file || image.file == null) && image.profileImg) {
      resp = await postUpdateValue({
        variables: {
          propertyId: propertyId,
          valueId: _id,
          data: {
            ...data,
            slug: data.name!.toLowerCase().replace(/ /g, "-"),
          },
        },
      });
    }
    if (
      (!image.file || image.file == null) &&
      (!image.profileImg || image.profileImg == null)
    ) {
      resp = await postUpdateValue({
        variables: {
          propertyId: propertyId,
          valueId: _id,
          data: {
            ...data,
            slug: data.name!.toLowerCase().replace(/ /g, "-"),
          },
          image: null,
        },
      });
    }
    if (resp?.data) {
      alert("Value updated");
      setUpdateValues(!updateValues);
    }
    ////falta ocultar modal y limpiar el formulario
  };
  return loading ? (
    <Loading />
  ) : (
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
        <Table.Body items={values}>
          {(item: Value) => (
            <Table.Row key={item._id}>
              {(columnKey: any) => (
                <Table.Cell>
                  {renderCell(item, columnKey, onClickEdit, onClickDelete)}
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
          onPageChange={(page) => {}}
        />
      </Table>
      <ModalValueProperty
        visibleModal={visibleModal}
        handleModalToggle={() => setVisibleModal(!visibleModal)}
        value={valueEdit}
        setValue={setValueEdit}
        image={image}
        setImage={setImage}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </>
  );
};

export default ValuePropertyTable;
