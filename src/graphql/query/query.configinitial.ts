import { gql } from "@apollo/client";

export const ALLCONFIGINITIAL = gql`
  query AllConfigInitial {
    allConfigInitial {
      name
      initial_user_credits
      initial_months_limit
      user {
        username
        name
        photo
        _id
        email
      }
      _id
    }
  }
`;
export const COFINGINITIAL = gql`
  query ConfigInitial {
    configInitial {
      _id
      name
      initial_user_credits
      initial_months_limit
      user {
        phone_number {
          country_code
          number
        }
        _id
        username
        email
      }
    }
  }
`;
