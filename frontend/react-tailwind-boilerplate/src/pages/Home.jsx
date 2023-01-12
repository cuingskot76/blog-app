import React from "react";

const Home = () => {
  const page = [
    {
      id: 1,
      title: "lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet mollis vivamus conubia litora nec placerat convallis sollicitudin mus sit auctor mauris justo sodales nostra rutrum nam pretium accumsan suspendisse cursus aliquet praesent congue pellentesque aptent",
      img: "https://source.unsplash.com/random/300x300",
    },
    {
      id: 2,
      title: "lorem ipsum ",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ",
      img: "https://source.unsplash.com/random/300x300",
    },
    {
      id: 3,
      title: "lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      img: "https://source.unsplash.com/random/300x300",
    },
  ];

  const myArr = page.map((x) => x.desc);
  console.log(myArr.map((x) => x.length));

  return (
    <div className="">
      <div className="flex flex-col mt-5">
        {page.map((item, i) => (
          <div className={`flex  justify-center mb-10`}>
            <div
              className={`flex flex-wrap items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : "row"
              } `}
            >
              <div className="max-w-[200px]">
                <img
                  src={item.img}
                  alt="img-content"
                  className="w-full rounded-sm"
                />
              </div>
              <div className=" max-w-md">
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <p className="text-[#ddd]">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
