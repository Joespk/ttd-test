import { allBlog } from "../Data/Imagedata";
import Banner from "../components/Banner";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <Banner />
      <div className="flex items-center justify-center flex-col gap-4 mx-auto my-0 ">
        <h1 className="font-bold text-[32px] items-center flex justify-around ">
          Lorem ipsum
        </h1>
        <div className="flex flex-row gap-4">
          {allBlog.map((blog) => (
            <Card key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
