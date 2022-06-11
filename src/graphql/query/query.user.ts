import { gql } from "@apollo/client";

export const GETUSERPERSONALDATA = gql`
  query GetUserPersonal($getUserPersonalId: ID!) {
    getUserPersonal(id: $getUserPersonalId) {
      username
      email
      type_account
      type_user
      name
      gender
      date_birth
      phone_number {
        number
        country_code
      }
      photo
      publication_limit
      premiun
      credits
      recovery_code
      state
      products {
        saleStatus
        ad_number
        name
        publisher
        state
        price {
          value
          currency
        }
        negotiated
        _id
      }
      _id
    }
  }
`;
