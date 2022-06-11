export interface Plan {
  _id?: string;
  name?: string;
  description?: string;
  type_plan?: null | string;
  price?: Price;
  image?: null | string;
  details?: string[];
  credits?: number;
  plan_time?: number;
  featured_products?: boolean;
  state?: boolean;
}

export interface Price {
  currency?: string;
  value?: number;
}
