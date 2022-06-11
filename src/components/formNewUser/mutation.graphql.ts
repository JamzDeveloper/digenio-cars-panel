import { gql } from "@apollo/client";

export const CREATEUSER = gql`
  mutation CreateUser($file: Upload,$data: InputUser) {
    createUser(file: $file,data: $data) {
      user {
        type_user
        type_account
        password
        username
        social_network {
          url
          name
        }
        photo
        phone_number {
          country_code
          number
        }
        name
      }
      token
    }
  }
`;
