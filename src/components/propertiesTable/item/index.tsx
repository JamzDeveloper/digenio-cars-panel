
import { Row, Col, Tooltip, Text } from "@nextui-org/react";
import { IconButton } from "./style";
import { EyeIcon } from "../../../assets/svg-components/eyeIcon";
import { EditIcon } from "../../../assets/svg-components/editIcon";
import { DeleteIcon } from "../../../assets/svg-components/deleteIcon";


import { Property } from "../../../models/PropertyType";

const renderCell = (
  property: Property,
  columnKey: React.Key,
  onClickView: Function,
  onClickEdit: Function,
  onClickDelete: Function
) => {
  const cellValue = property[columnKey as keyof Property];

  switch (columnKey) {
    case "name":
      return (
        <Row>
          <Col>
            <Text css={{ tt: "capitalize" }}>{property.name}</Text>
          </Col>
        </Row>
      );
    case "quantity":
      return (
        <Row>
          <Col>
            <Text>{property.value?.length}</Text>
          </Col>
        </Row>
      );

    case "actions":
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton
                onClick={() => {
                  onClickView(property._id as string);
                }}
              >
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => onClickEdit(property._id as string)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={() => onClickDelete(property._id as string)}
            >
              <IconButton>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    default:
      return cellValue;
  }
};

export default renderCell;
