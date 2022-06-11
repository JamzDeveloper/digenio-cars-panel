export interface Product {
  publisher?: Date;
  _id?: string;
  ad_number?: number;
  name?: string;
  price?: Price;
  negotiated?: boolean;
  user?: User;
  location?: Location;
  description?: string;
  detail_product?: DetailProduct;
  media?: Media[];	
  saleStatus?: string;
  state?: boolean;
  featured?: boolean;
  view?: number;
}

export interface DetailProduct {
  category?: BodyType;
  brand?: BodyType;
  manufacturing_year?: number;
  model?: BodyType;
  mileage?: number;
  body_type?: BodyType;
  drive_type?: BodyType;
  engine?: string;
  fuel_type?: BodyType;
  transmission?: BodyType;
  city_mpg?: number;
  highway_mpg?: number;
  interior_color?: string;
  exterior_color?: string;
  condition?: string;
  features?: Feature[];
  vin?: string;
  view?: number;
}

export interface BodyType {
  value?: Value;
  property?: Property;
  name?: string;
}

export enum Property {
  The623113A1Aa486695A1Abdc4F = "623113a1aa486695a1abdc4f",
}

export enum Value {
  The623113A1Aa486695A1Abdc61 = "623113a1aa486695a1abdc61",
}

export interface Feature {
  value?: string[];
  key?: string;
}

export interface Location {
  lng?: number;
  lat?: number;
  country?: string;
  city?: string;
  district?: string;
  street?: string;
  zip_code?: string;
}

export interface Price {
  currency?: string;
  value?: number;
}

export interface User {
  gender?: string;
  name?: string;
  type_user?: string;
  type_account?: string;
  password?: string;
  email?: string;
  username?: string;
  _id?: string;
}
export interface Media{
  filename?:string;
  mimetype?:string;
  encoding?:string;
  url?:string;
}