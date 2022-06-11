import { gql } from "@apollo/client";

export const DELETEPLAN = gql`
  mutation DeletePlan($deletePlanId: ID!) {
    deletePlan(id: $deletePlanId) {
      _id
      name
      type_plan
      description
      price {
        value
        currency
      }
      image
    }
  }
`;
export const TOGGLEPLAN = gql`
  mutation TogglePlan($togglePlanId: ID!) {
    togglePlan(id: $togglePlanId) {
      _id
      name
      description
      type_plan
      price {
        currency
        value
      }
      image
      details
      credits
      plan_time
      featured_products
      state
    }
  }
`;

export const CREATEPLAN = gql`
  mutation CreatePlan($data: InputPlan!, $file: Upload) {
    createPlan(data: $data, file: $file) {
      name
      type_plan
      description
    }
  }
`;

export const UPDATEPLAN = gql`
  mutation UpdatePlan(
    $updatePlanId: ID!
    $data: InputPlanUpdate
    $file: Upload
  ) {
    updatePlan(id: $updatePlanId, data: $data, file: $file) {
      _id
      name
      type_plan
    }
  }
`;
