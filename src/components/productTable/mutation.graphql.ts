import { gql } from "@apollo/client";

export const DELETEPRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId) {
      _id
    }
  }
`;
