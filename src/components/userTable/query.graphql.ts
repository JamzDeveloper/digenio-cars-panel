import { gql } from "@apollo/client";
export const ALLUSERS = gql`
query AllUsers {
    allUsers {
      username
      _id
      email
      password
      type_account
      type_user
      name
      gender
      phone_number {
        number
        country_code
      }
      photo
      publication_limit
      credits
      state
      product_favorites {
        _id
        ad_number
        name
        publisher
        price {
          currency
          value
        }
        negotiated
        location {
          lat
          lng
        }
        description
        detail_product {
          model {
            name
          }
        }
        media {
          url
          encoding
          mimetype
          filename
        }
      }
      reviews {
        _id
        comment
        like {
          photo
          name
          username
          _id
        }
        dislike {
          photo
          name
          username
          _id
        }
        stars
        createdAt
        updatedAt
      }
      products {
        name
        _id
      }
    }
  }
`