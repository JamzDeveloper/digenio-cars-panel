import { gql } from "@apollo/client";
export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        type_user
        password
        email
        username
        photo
        name
      }
    }
  }
`;
