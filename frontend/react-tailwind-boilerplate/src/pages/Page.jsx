import React from "react";
import Sidebar from "../components/Sidebar";

const Page = () => {
  const pages = [
    {
      id: 1,
      title: "lorem ipsum dolor sit amet",
      subTitle: "lorem ipsum dolor sit amet mollis  vivamus conubia",
      desc: "Lorem ipsum dolor sit amet mollis vivamus conubia litora nec placerat convallis sollicitudin mus siasdfasdf",
      img: "https://source.unsplash.com/random/300x300",
      writter: "John Doe",
      userDesc:
        "Lorem ipsum dolor sit amet rhoncus luctus porta tristique cubilia cursus consequat sapien duis montes ac inceptos finibus at eleifend volutpat quam lacus posuere ",
      followers: 1234,
      date: "Jan 1, 2023",
      read: "2 min read",
    },
  ];
  return (
    <div className="mt-5">
      {pages.map((item, i) => (
        <div key={i} className="flex justify-between">
          <div className="">
            <div className="flex items-center gap-5">
              <div className="max-w-[3rem]">
                <img
                  src={item.img}
                  alt="user-img"
                  className="rounded-full bg-cover"
                />
              </div>
              <div className="flex flex-col ">
                <span className="mb-2">{item.writter}</span>
                <div>
                  <span className="text-gray-400">{item.date}</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-gray-400">{item.read}</span>
                </div>
              </div>
            </div>
            <div className="my-5">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-gray-400">{item.subTitle}</p>
            </div>
            <div className="max-w-[25rem]">
              <img
                src={item.img}
                alt="hero-img"
                className="w-full rounded-sm my-5 "
              />
            </div>
            <p className="max-w-md">{item.desc}</p>
          </div>
          <div className="hidden lg:block">
            <Sidebar {...item} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
