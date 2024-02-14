import { blog } from "../type/dto";

interface IBlogprops {
  blog: blog;
}

const Card = ({ blog }: IBlogprops) => {
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg bg-white pb-3 relative hover:translate-y-[-5px] transition-transform duration-300">
      <img src={blog.image} />
      <div className="px-2">
        <h2 className="text-lg font-bold mb-1 line-clamp-2">Lorem ipsum</h2>
        <span className="text-gray-600 line-clamp-3 my-2 text-sm">
          One-stop Platform community for Agents and Operator in Thailand
        </span>
        <button className="bg-[#2A4B6A] hover:bg-blue-800 text-white font-bold py-1 px-3 rounded ">
          Buy package
        </button>
      </div>
    </div>
  );
};

export default Card;
