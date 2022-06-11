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
  }
`;


export const ONEPROPERTY = gql`
  query Property($propertyId: ID!) {
    property(id: $propertyId) {
      _id
      name
      value {
        slug
        name
        _id
        group {
          value
          property
        }
        description
        image
      }
    }
  }
`;
