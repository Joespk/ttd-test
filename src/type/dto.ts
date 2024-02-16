export interface blog {
  id: number;
  imageUrl: string;
}

export interface UserDto {
  profilepic: string | null;
  email: string;
  password: string;
  company: string;
  taxid: string;
  fullname: string;
  country: string;
  address: string;
  province: string;
  district: string;
  city: string;
  zipcode: string;
  countrycode: string;
  phone: string;
  website: string;
  id: string;
}
