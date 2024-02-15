import { Link } from "react-router-dom";
import logo from "../assets/ttdlogo.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto py-4 h-20 flex justify-center overflow-hidden shadow-2xl drop-shadow-xl my-1 max-w-[1920px]">
        <div className="flex flex-row items-center justify-between gap-[500px] ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <ul className="flex flex-row gap-5 items-center px-5 uppercase">
            <li>
              <Link to="/" className="text-black">
                Home
              </Link>
            </li>
          </ul>
          <Link to="/signin">
            <button className="bg-[#2A4B6A] w-[141px] px-[16px] py-1 text-white font-semibold rounded-[33px] text-xl drop-shadow-2xl">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
