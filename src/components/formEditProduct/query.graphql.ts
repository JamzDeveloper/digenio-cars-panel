import { gql } from "@apollo/client";
export const ALLPROPERTIES = gql`
query Properties {
    properties {
      _id
      name
      value {
        _id
        name
        slug
        image
        description
        group {
          property
          value
        }
      }
    }
  }`;
