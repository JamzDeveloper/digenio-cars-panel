import { Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import moment from "moment";
import { IconButton, StyledBadge } from "./style";
import { EyeIcon } from "../../../assets/svg-components/eyeIcon";
import { EditIcon } from "../../../assets/svg-components/editIcon";
import { DeleteIcon } from "../../../assets/svg-components/deleteIcon";
import RefreshIcon from "../../../assets/svg-components/Refresh";
import { User as UserType } from "../../../models/UserType";

const renderCell = (
  user: UserType,
  columnKey: React.Key,
  onClickEdit: Function,
  onClickDetele: Function,
  onClickView: Function
) => {
  const cellValue = user[columnKey as keyof UserType];
  switch (columnKey) {
    case "name":
      return (
        <User
          squared
          src={`${process.env.NEXT_PUBLIC_URL}/images/${user?.photo}`}
          name={cellValue}
          css={{ p: 0 }}
        >
          {user?.username}
        </User>
      );
    case "email":
      return (
        <Row>
          <Col>
            <Text>{cellValue}</Text>
          </Col>
        </Row>
      );
    case "credits":
      return (
        <Row>
          <Col>
            <Text>{cellValue}</Text>
          </Col>
        </Row>
      );
    case "publication_limit":
      return (
        <Row>
          <Col>
            <Text>{moment(cellValue as string).format("MMMM DD YYYY")}</Text>
          </Col>
        </Row>
      );
    case "type_user":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
          </Row>
        </Col>
      );
    case "state":
      return (
        <StyledBadge statusUser={cellValue as boolean}>
          {cellValue ? "Available" : "Not Available"}
        </StyledBadge>
      );

    case "actions":
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton onClick={() => onClickView(user._id as string)}>
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => onClickEdit(user._id as string)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content={user.state ? "Delete user" : "Activate user"}
              color={user.state ? "error" : "success"}
              onClick={() => onClickDetele(user._id as string)}
            >
              <IconButton>
                {user.state ? (
                  <DeleteIcon size={20} fill="#FF0080" />
                ) : (
                  <RefreshIcon width={20} height={20} color="#00C24A" />
                )}
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
