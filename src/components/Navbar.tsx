import logo from "../assets/ttdlogo.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto py-4 h-20">
        <div className="flex flex-row items-center justify-between ">
          <img src={logo} alt="logo" />
          <ul className="flex flex-row gap-5 items-center px-5 uppercase">
            <li>
              <a href="/" className="text-black">
                Home
              </a>
            </li>
          </ul>
          <button className="bg-[#2A4B6A] w-[141px] p-[16px] text-white font-semibold rounded-[33px] text-xl drop-shadow-2xl">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
