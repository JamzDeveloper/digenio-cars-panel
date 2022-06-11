import moment from "moment";
import { Row, Col, Tooltip, Text } from "@nextui-org/react";
import { IconButton, StyledBadge } from "./style";
import { EyeIcon } from "../../../assets/svg-components/eyeIcon";
import { EditIcon } from "../../../assets/svg-components/editIcon";
import { DeleteIcon } from "../../../assets/svg-components/deleteIcon";
import { Product } from "../../../models/ProductType";
import RefreshIcon from "../../../assets/svg-components/Refresh";

const renderCell = (product: Product, columnKey: React.Key,
  onClickView:Function,onClickEdit:Function, onClickDelete:Function) => {
  const cellValue = product[columnKey as keyof Product];
  
  switch (columnKey) {
    case "name":
      return (
        <Row>
          <Col>
            <Text css={{ tt: "capitalize" }}>{product.name}</Text>
          </Col>
        </Row>
      );
    case "publisher":
      return (
        <Row>
          <Col>
            <Text>{moment(product.publisher).format("MMMM Do YYYY")}</Text>
          </Col>
        </Row>
      );
    case "price":
      return (
        <Row>
          <Col>
            <Text>{`${product.price?.value} ${product.price?.currency}`}</Text>
          </Col>
        </Row>
      );
    case "user":
      return (
        <Row>
          <Col>
            <Text css={{ tt: "capitalize" }}>{product.user?.name}</Text>
          </Col>
        </Row>
      );
    case "negotiated":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {product.negotiated ? "Yes" : "No"}
            </Text>
          </Row>
        </Col>
      );
    case "saleStatus":
      return (
        <Col>
          <Row>
            <Text b size={14}  transform="capitalize">
              {product.saleStatus}
            </Text>
          </Row>
        </Col>
      );
    case "state":
    
      return (
        <StyledBadge statusProduct={product.state as boolean}>
          {product.state ? "Available" : "Removed"}
        </StyledBadge>
      );

    case "actions":
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton
                onClick={() => {onClickView(product._id as string)}}
              >
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton
                onClick={() =>onClickEdit(product._id as string)}
              >
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={() => onClickDelete(product._id as string)}
            >
              <IconButton>
              {product.state ? (
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
