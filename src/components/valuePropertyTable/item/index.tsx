import { Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { IconButton, StyledBadge } from "./style";
import { EditIcon } from "../../../assets/svg-components/editIcon";
import { DeleteIcon } from "../../../assets/svg-components/deleteIcon";
import { Value } from "../../../models/PropertyType";

const renderCell = (
  value: Value,
  columnKey: React.Key,
  onClickEdit: Function,
  onClickDelete: Function
) => {
  const cellValue = value[columnKey as keyof Value];
  switch (columnKey) {
    case "name":
      return (
        <User
          squared
          src={
            value.image
              ? `http://localhost:4000/images/${value?.image}`
              : "/images/Imagenotavailable.png"
          }
          name={cellValue}
          css={{ p: 0 }}
        >
          {value?.name}
        </User>
      );
    case "slug":
      return (
        <Row>
          <Col>
            <Text>{cellValue}</Text>
          </Col>
        </Row>
      );
    case "description":
      return (
        <Row style={{ maxWidth: "300px", wordWrap: "break-word" }}>
          <Col>
            <Text style={{ overflow: "hidden", wordWrap: "break-word" }}>
              {cellValue}
            </Text>
          </Col>
        </Row>
      );

    case "actions":
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit Value">
              <IconButton onClick={() => onClickEdit(value._id as string)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete Value"
              onClick={() => onClickDelete(value._id as string)}
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
