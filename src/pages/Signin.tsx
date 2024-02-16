import mail from "../assets/logo/mail.svg";
import lock from "../assets/logo/lock.svg";
import view from "../assets/logo/view.svg";
import imagelogo from "../assets/logo/image.svg";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../hook/useSignin";

interface District {
  name_th: string;
}

interface Amphure {
  name_th: string;
  tambon: District[];
}

interface Province {
  name_th: string;
  amphure: Amphure[];
}

const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [profilepic, setImage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [country, setCountry] = useState<string>("Thailand");
  const [countrycode, setCountryCode] = useState<string>("+66");
  const [province, setProvince] = useState<string>("");
  const [provincelist, setProvincelist] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [citylist, setCitylist] = useState<string[]>([]);
  const [district, setDistrict] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [taxid, setTaxid] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [districlist, setDistriclist] = useState<string[]>([]);
  const [id, setId] = useState<string>("");
  const { isSubmitting, register } = useSignin();

  const getRandomId = (): string => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const randomId = getRandomId();
    setId(randomId);
    setConfirmPassword("");
    setEmail("");
    setCity("");
    setAddress("");
    setDistrict("");
    setZipcode("");
    setPassword("");
    setCompany("");
    setCountry("");
    setCountryCode("");
    setTaxid("");
    setFullname("");
    setPhone("");
    setWebsite("");
    setImage("");
    try {
      if (password !== confirmpassword)
        throw new Error("Password does not match");
      await register(
        profilepic,
        email,
        password,
        company,
        taxid,
        fullname,
        country,
        address,
        province,
        district,
        city,
        zipcode,
        countrycode,
        phone,
        website,
        id
      );
    } catch (error) {
      console.error("Cannot Register");
    }
  };

  const fetchProvincesAndCities = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      );
      const data: Province[] = await response.json();
      const provinces = data.map((item) => item.name_th);
      setProvincelist(provinces);

      // สำหรับเมืองจะทำได้ตามความเหมาะสมของโค้ด
    } catch (error) {
      console.error("Error fetching provinces and cities:", error);
    }
  };

  useEffect(() => {
    fetchProvincesAndCities();
  }, []);

  //Api is not support upload image because api  is free version so we can't test it.
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    if (event instanceof DragEvent) {
      const file: File | undefined = event.dataTransfer?.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    } else {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files[0]) {
        const file: File = inputElement.files[0];
        handleFileUpload(file);
      }
    }
  };

  // const handleFileInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   event.preventDefault();
  //   if (event.target.files && event.target.files[0]) {
  //     const file: File = event.target.files[0];
  //     const red = handleFileUpload(file);
  //     console.log(red);
  //   }
  // };

  const handleFileUpload = (file: File): void => {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        // setImage(reader.result);
        // URL string
        setImage(reader.result); // ตั้งค่า URL string ไปยัง state ที่เก็บ URL ของรูปภาพ
      }
    };
    reader.readAsDataURL(file);
  };

  const preventDefaults = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleProvinceChange = async (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    setProvince(selectedValue);
    if (selectedValue) {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
        );
        const data: Province[] = await response.json();

        // กรองข้อมูลเฉพาะอำเภอที่มีจังหวัดตรงกับที่เลือกไว้
        const selectedProvinceData = data.find(
          (item) => item.name_th === selectedValue
        );

        if (selectedProvinceData) {
          // เฉพาะอำเภอของจังหวัดที่เลือก
          const cityItems = selectedProvinceData.amphure.map(
            (item) => item.name_th
          );
          // ตั้งค่ารายการอำเภอใหม่
          setCitylist(cityItems);
        } else {
          console.error("Province data not found:", selectedValue);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      // ถ้าไม่มีการเลือกจังหวัด ก็เคลียร์รายการอำเภอ
      setCitylist([]);
    }
  };

  const handleCityChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setCity(selectedValue);
    if (selectedValue) {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
        );
        const data: Province[] = await response.json();

        const selectedCityData = data.find((province) =>
          province.amphure.find((city) => city.name_th === selectedValue)
        );

        if (selectedCityData) {
          const districtItems =
            selectedCityData.amphure
              .find((city) => city.name_th === selectedValue)
              ?.tambon.map((district) => district.name_th) || [];
          setDistriclist(districtItems);
        } else {
          console.error("City data not found:", selectedValue);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    } else {
      setDistriclist([]);
    }
  };

  const handleDistrictChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    setDistrict(selectedValue);
  };

  const handleCountryCodeChange = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    setCountryCode(selectedValue);
  };

  const handleCountryChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    setCountry(selectedValue);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container max-w-[1263px] mx-auto px-[250px] rounded-md overflow-hidden shadow-2xl bg-white pb-3  flex flex-col justify-between items-center  drop-shadow-xl  py-5 mt-3">
      <form
        className="grid grid-cols-3 gap-2 justify-center mb-2"
        onSubmit={handleSubmit}
      >
        <div
          className="w-36 h-36 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-3 col-start-2"
          onDrop={handleDrop}
          onDragOver={preventDefaults}
          onDragEnter={preventDefaults}
        >
          {!profilepic && (
            <label htmlFor="fileInput" className="text-gray-400 cursor-pointer">
              <img src={imagelogo} alt="Profile Picture" />
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleDrop}
              />
            </label>
          )}
          {profilepic && (
            <img
              src={profilepic}
              alt="Uploaded"
              className="w-full h-full rounded-full"
            />
          )}
        </div>
        <div className="relative col-start-1 ">
          <h2 className="text-sm ">Email</h2>
          <div className="relative ">
            <input
              type="email"
              value={email}
              name="email"
              placeholder="Enter your email"
              className="w-full px-10 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 left-0 top-[40%] transform -translate-y-1/2 pl-2">
              <img src={mail} alt="mail" className="h-6 w-6" />
            </div>
          </div>
          <br />
        </div>
        <div className="relative col-start-2 ">
          <h2 className="text-sm">Password</h2>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
            />
            <div className="absolute inset-y-0 left-0 top-[40%] transform -translate-y-1/2 pl-2">
              <img src={lock} alt="mail" className="h-6 w-6" />
            </div>
            <div className="absolute inset-y-0 left-[85%] top-[40%] transform -translate-y-1/2 pl-2">
              <img
                src={view}
                alt="mail"
                className="h-6 w-6"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <br />
        </div>
        <div className="relative col-start-3">
          <h2 className="text-sm">Confirmed Password</h2>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-10 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
            />
            <div className="absolute inset-y-0 left-0 top-[40%] transform -translate-y-1/2 pl-2">
              <img src={lock} alt="mail" className="h-6 w-6" />
            </div>
            <div className="absolute inset-y-0 left-[85%] top-[40%] transform -translate-y-1/2 pl-2">
              <img
                src={view}
                alt="mail"
                className="h-6 w-6"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <br />
        </div>
        <hr className="w-full col-start-1 col-end-4" />
        <h1 className="col-span-3 mb-2">Information</h1>
        <div className="col-">
          <h2 className="text-sm">Company Name</h2>
          <input
            type="text"
            name="Company Name"
            value={company}
            placeholder="Enter your Company Name"
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
        <div className="col-start-2">
          <h2 className="text-sm">Tax ID</h2>
          <input
            type="text"
            name="Tax ID"
            value={taxid}
            onChange={(e) => setTaxid(e.target.value)}
            placeholder="Enter Tax ID"
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
        <div className="col-start-3">
          <h2 className="text-sm">Full Name</h2>
          <input
            type="text"
            name="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter Full name"
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
        <div className="col-span-1">
          <h2 className="text-sm">Country</h2>
          <select
            name="country"
            id="country"
            value={country}
            onChange={handleCountryChange}
            className="w-full pl-4 pr-16 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 text-sm"
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Thailand">Thailand</option>
          </select>
        </div>
        <div className="col-start-2 items-center ">
          <h2 className="text-sm">Phone Number</h2>
          <div className="flex flex-row">
            <select
              name="country"
              id="country"
              value={countrycode}
              onChange={handleCountryCodeChange}
              className=" py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 text-sm"
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+66">+66</option>
            </select>
            <input
              type="text"
              name="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone number"
              className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
            />
          </div>
        </div>
        <div className="col-start-3">
          <h2 className="text-sm">Website</h2>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter website"
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
        <div className="col-start-1">
          <h2 className="text-sm">Address</h2>
          <textarea
            name="Address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-24 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm resize-none"
          />
        </div>
        <div className="col-start-2">
          <h2 className="text-sm ">State/Province</h2>
          <select
            name="Choose Province"
            id="province"
            value={province}
            onChange={handleProvinceChange}
            className={`w-full pl-4 pr-16 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 text-sm mt-1 ${
              !province && "text-gray-500"
            }`}
          >
            <option value="" disabled selected className="text-gray-500">
              Choose Province
            </option>
            {provincelist.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <h2 className="text-sm mt-1">City/District</h2>
          <select
            name="Choose Province"
            id="City"
            value={city}
            onChange={handleCityChange}
            className={`w-full pl-4 pr-16 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 text-sm mt-1 ${
              !province && "text-gray-500"
            }`}
          >
            <option value="" className="text-gray-500" disabled selected>
              Choose District
            </option>
            {citylist.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="col-start-3">
          <h2 className="text-sm ">Sub-District</h2>
          <select
            name="Choose Province"
            id="province"
            value={district}
            onChange={handleDistrictChange}
            className={`w-full pl-4 pr-16 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 text-sm mt-1 ${
              !province && "text-gray-500"
            }`}
          >
            <option value="" disabled selected className="text-gray-500">
              Choose Sub-District
            </option>
            {districlist.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <h2 className="text-sm mt-1">Zip Code</h2>
          <input
            type="text"
            name="ZipCode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter Zip Code"
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
        <Link to="/">
          <button className="bg-black w-[50%] px-[16px] py-1 text-white font-semibold rounded-[33px] text-base drop-shadow-2xl  hover:translate-y-[-5px]">
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="bg-[#5FC198] w-[50%] px-[16px] py-1 text-white font-semibold rounded-[33px] text-base drop-shadow-2xl hover:translate-y-[-5px] col-start-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
