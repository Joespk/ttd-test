import { blog } from "../type/dto";

interface IBlogprops {
  blog: blog;
}

const Card = ({ blog }: IBlogprops) => {
  return (
    <div className="max-w-64 rounded-md  overflow-hidden shadow-2xl bg-white pb-3  hover:translate-y-[-5px] transition-transform duration-300 flex flex-col items-center drop-shadow-xl ">
      <img src={blog.imageUrl} />
      <div className="flex flex-col item-center justify-center">
        <h2 className="text-lg font-bold  flex justify-center">Lorem ipsum</h2>
        <span className="text-gray-600  my-2 text-sm">
          One-stop Platform community for Agents and Operator in Thailand
        </span>
      </div>
      <button className=" flex justify-center item-center text-[16px] bg-[#2A4B6A] hover:bg-blue-800 text-white font-base rounded-lg w-[141px] py-[10px] ">
        Buy package
      </button>
    </div>
  );
};

export default Card;
