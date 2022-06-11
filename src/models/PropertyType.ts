export interface Response {
  data: Data;
}

export interface Data {
  property: Property;
}

export interface Property {
  _id?: string;
  name?: string;
  value?: Value[];
}

export interface Value {
  _id?: string;
  name?: string;
  slug?: string;
  image?: string;
  group?: Group | null;
  description?: string;
}

export interface Group {
  property?: string;
  value?: string;
}
