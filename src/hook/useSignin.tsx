import { useState } from "react";
import { UserDto } from "../type/dto";
import axios from "axios";

const useSignin = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const register = async (
    profilepic: string | null,
    email: string,
    password: string,
    company: string,
    taxid: string,
    fullname: string,
    country: string,
    address: string,
    province: string,
    district: string,
    city: string,
    zipcode: string,
    countrycode: string,
    phone: string,
    website: string,
    id: string
  ) => {
    const newUserBody: UserDto = {
      profilepic: profilepic,
      email: email,
      password: password,
      company: company,
      taxid: taxid,
      fullname: fullname,
      country: country,
      address: address,
      province: province,
      district: district,
      city: city,
      zipcode: zipcode,
      countrycode: countrycode,
      phone: phone,
      website: website,
      id: id,
    };
    setIsSubmitting(true);
    try {
      //Api is not support upload image because api  is free version so we can't test it. fix
      const res = await axios.post<UserDto>(
        "https://65ced717bdb50d5e5f5a070f.mockapi.io/testttd",
        newUserBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
    } catch (err) {
      alert("Username already exists");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, register };
};

export default useSignin;
