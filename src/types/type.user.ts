export type InputEditUser = {
  username?: string;
  email?: string;
  password?: string;
  type_account?: string;
  type_user?: string;
  name?: string;
  gender?: string;
  date_birth?: Date;
  phone_number?: PhoneNumber;
  social_network?: [InputSocialMedia];
  credits?: Number;
  publication_limit?: Date | string;
  premiun?: boolean;
  state?: boolean;
  recovery_code?: number | string;
};

type InputSocialMedia = {
  name?: string;
  url?: string;
};
type PhoneNumber = {
  number: string;
  country_code: number;
};
