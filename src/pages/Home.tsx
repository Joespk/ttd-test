import Banner from "../components/Banner";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="flex flex-col gap-16 ">
      <Banner />
      <div className="flex items-center justify-center flex-col gap-6 ">
        <h1 className="font-bold text-[32px]">Lorem ipsum</h1>
        <div>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Home;
