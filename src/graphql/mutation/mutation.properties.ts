import { gql } from "@apollo/client";

export const DELETEPROPERTYVALUE = gql`
  mutation DeletePropertyValue($propertyId: ID!, $valueId: ID!) {
    deletePropertyValue(propertyId: $propertyId, valueId: $valueId) {
      _id
      name
      value {
        _id
        name
        slug
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

export const DELETEPROPERTY = gql`
  mutation DeleteProperty($deletePropertyId: ID!) {
    deleteProperty(id: $deletePropertyId) {
      _id
      name
    }
  }
`;

export const NEWPROPERTY = gql`
  mutation CreateProperty($data: InputProperty) {
    createProperty(data: $data) {
      name
      _id
    }
  }
`;

export const NEWPROPERTYVALUE = gql`
  mutation NewValueProperty(
    $propertyId: ID!
    $data: InputNewValueProperty
    $image: Upload
  ) {
    newValueProperty(propertyId: $propertyId, data: $data, image: $image) {
      _id
      name
      slug
      image
      description
      group {
        value
        property
      }
    }
  }
`;


export const UPDATEPROPERTY = gql`
mutation UpdateProperty($updatePropertyId: ID!, $name: String) {
  updateProperty(id: $updatePropertyId, name: $name) {
    name
    _id
  }
}`;


export const UPDATEPROPERTYVALUE = gql`
mutation UpdatePropertyValue($propertyId: ID!, $valueId: ID!, $data: InputNewValueProperty, $image: Upload) {
  updatePropertyValue(propertyId: $propertyId, valueId: $valueId, data: $data, image: $image) {
    _id
    name
  }
}

`;