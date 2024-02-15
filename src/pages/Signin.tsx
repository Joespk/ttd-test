import mail from "../assets/logo/mail.svg";
import lock from "../assets/logo/lock.svg";
import view from "../assets/logo/view.svg";
import { useState } from "react";

const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [country, setCountry] = useState<string>("Thailand");
  const [countryCode, setCountryCode] = useState<string>("+66");

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
    <div className="container max-w-[1263px] mx-auto px-[250px] rounded-md overflow-hidden shadow-2xl bg-white pb-3  flex flex-col justify-between items-center  drop-shadow-xl  py-4">
      <form className="grid grid-cols-3 gap-4 justify-between mb-2">
        <div className="relative col-start-1 ">
          <h2 className="text-sm ">Email</h2>
          <div className="relative ">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-10 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
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
        <h1 className="col-span-3 mb-2">Information</h1>
        <div className="col-">
          <h2 className="text-sm">Company Name</h2>
          <input
            type="text"
            name="Company Name"
            placeholder="Enter your Company Name"
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
        <div className="col-start-2">
          <h2 className="text-sm">Tax ID</h2>
          <input
            type="text"
            name="Tax ID"
            placeholder="Enter Tax ID"
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
        <div className="col-start-3">
          <h2 className="text-sm">Full Name</h2>
          <input
            type="text"
            name="Fullname"
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
              value={countryCode}
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
            placeholder="Enter website"
            className="w-full px-4 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default Signin;
