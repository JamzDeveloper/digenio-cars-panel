import { gql } from "@apollo/client";
export const ALLPRODUCTS = gql`
  query AllProducts {
    allProductForAdmin {
      _id
      ad_number
      name
      state
      publisher
      saleStatus
      featured
      view
      negotiated  
      price {
          currency
          value
        }
      user {
        name
        email
        username
        _id
      }
    }
  }
`;

export const DATAPRODUCT = gql`
query Product($productId: ID!) {
    product(id: $productId) {
      _id
      publisher
      price {
        value
        currency
      }
      user {
        username
        _id
        email
        password
        type_account
        type_user
        name
        phone_number {
          country_code
          number
        }
        photo
      }
      name
      ad_number
      negotiated
      location {
        lat
        lng
        country
        city
        district
        street
        zip_code
      }
      description
      detail_product {
        category {
          name
          property
          value
        }
        model {
          name
        }
        manufacturing_year
        mileage
        body_type {
          name
        }
        drive_type {
          name
        }
        engine
        transmission {
          name
        }
        fuel_type {
          name
        }
        city_mpg
        highway_mpg
        interior_color
        exterior_color
        condition
        features {
          value
          key
        }
        vin
        view
        brand {
          name
        }
      }
      media {
        filename
        mimetype
        encoding
        url
      }
      saleStatus
    }
  }
 
`;