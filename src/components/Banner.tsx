const Banner = () => {
  return (
    <div className="container mx-auto max-w-[1920px] bg-[url('./src/assets/Banner.jpg')] bg-center bg-cover  flex  justify-around h-[625px] items-center my-0 ">
      <div className="flex flex-col justify-center gap-4 items-center">
        <h1 className="text-5xl font-bold text-white drop-shadow-2xl ">
          Lorem ipsum dolor sit amet consectetur.
        </h1>
        <h2 className="text-3xl font-medium text-white drop-shadow-2xl ">
          One-stop Platform community for Agents and Operator in Thailand.
        </h2>
      </div>
    </div>
  );
};

export default Banner;
