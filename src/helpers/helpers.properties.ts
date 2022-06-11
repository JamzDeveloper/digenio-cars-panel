export type PropertiesSelect = {
  category: {
    id: string;
    value: PropertiesSelectOptions[];
  };
  brand: {
    id: string;
    value: PropertiesSelectOptions[];
  };
  model: {
    id: string;
    value: PropertiesSelectOptions[];
  };
  body_type: {
    id: string;
    value: PropertiesSelectOptions[];
  };
  drive_type: {
    id: string;
    value: PropertiesSelectOptions[];
  };
  transmission: {
    id: string;
    value: PropertiesSelectOptions[];
  };
  fuel_type: {
    id: string;
    value: PropertiesSelectOptions[];
  };
};

export type PropertiesSelectOptions = {
  label: string;
  value: string;
};
