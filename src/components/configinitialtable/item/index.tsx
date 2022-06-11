import { Row, Col, Tooltip, User, Text } from "@nextui-org/react";

import { IconButton } from "../style";
import { EyeIcon } from "../../../assets/svg-components/eyeIcon";
import { EditIcon } from "../../../assets/svg-components/editIcon";
import { DeleteIcon } from "../../../assets/svg-components/deleteIcon";

import { ConfigInitial } from "../../../models/ConfigInitialType";

const renderCell = (
  configValue: ConfigInitial,
  columnKey: React.Key,
  onClickEdit: Function,
  onClickDetele: Function,

) => {
  const cellValue = configValue[columnKey as keyof ConfigInitial];

  switch (columnKey) {
    case "user":
      return (
        <User
          squared
          src={`${process.env.NEXT_PUBLIC_URL}/images/${configValue?.user?.photo}`}
          name={configValue.user?.name}
        >
          {configValue?.user?.username}
        </User>
      );
    case "email":
      return (
        <Row>
          <Col>
            <Text>{configValue?.user?.email}</Text>
          </Col>
        </Row>
      );
    case "name":
      return (
        <Row>
          <Col>
            <Text>{configValue.name}</Text>
          </Col>
        </Row>
      );
    case "initial_user_credits":
      return (
        <Row>
          <Col>
            <Text>{configValue.initial_user_credits}</Text>
          </Col>
        </Row>
      );
    case "initial_months_limit":
      return (
        <Row>
          <Col>
            <Text>{configValue.initial_months_limit}</Text>
          </Col>
        </Row>
      );

    case "actions":
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => onClickEdit(configValue._id)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content={"Delete user"}
              color={"error"}
              onClick={() =>onClickDetele(configValue._id)}
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
