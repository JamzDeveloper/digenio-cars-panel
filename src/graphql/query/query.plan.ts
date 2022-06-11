import { gql } from "@apollo/client";

export const ALLPLANS = gql`
query Plans {
    plans {
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