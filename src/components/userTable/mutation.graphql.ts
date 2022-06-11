import { gql } from "@apollo/client";
export const UPDATEUSER = gql`
mutation UpdateUserByAdmin(
  $updateUserByAdminId: String!
  $data: InputUpdateUserByAdmin
) {
  updateUserByAdmin(id: $updateUserByAdminId, data: $data) {
    _id
    username
    email
    type_account
    type_user
    state
    phone_number {
      number
      country_code
    }
    date_birth
    gender
    name
    photo
    credits
    publication_limit
    state
   
  }
}
`;
