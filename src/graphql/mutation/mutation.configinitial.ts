import { gql } from "@apollo/client";

export const UPDATECONFIGINITIAL = gql`
  mutation UpdateConfigInitial(
    $updateConfigInitialId: ID!
    $data: InpuntConfigInitial
  ) {
    updateConfigInitial(id: $updateConfigInitialId, data: $data) {
      name
      initial_user_credits
      initial_months_limit
      user {
        photo
        name
        email
        username
        _id
      }
      _id
    }
  }
`;


export const CREATECONFIGINITIAL = gql`
mutation CreateConfigInitial($data: InpuntConfigInitial) {
    createConfigInitial(data: $data) {
      _id
      name
      initial_user_credits
      initial_months_limit
      user {
        username
        _id
        email
        name
        photo
      }
    }
  }
`;

export const DELETECONFIGINITIAL = gql`
mutation DeleteConfigInitial($deleteConfigInitialId: ID!) {
    deleteConfigInitial(id: $deleteConfigInitialId) {
      name
      initial_user_credits
      initial_months_limit
    }
  }
`;