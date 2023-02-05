import { faLineChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Avatar from "boring-avatars";

const Trending = () => {
  const postTrending = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      writter: "Johny Doe",
      date: "Jan 1, 2023",
      read: "5 min read",
    },
    {
      id: 2,
      title:
        "Lorem ipsum dolor sit amet id cursus si ultricies sagittis magna metus",
      writter: "Alex Rou",
      date: "Jan 15, 2023",
      read: "6 min read",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet ",
      writter: "Ayanna Lie",
      date: "Jan 20, 2023",
      read: "3 min read",
    },
    {
      id: 4,
      title:
        "Lorem ipsum etiam volutpat dapibus non arcu malesuada fusce nunc nostra cursus consequat blandit",
      writter: "Laura Lee",
      date: "Jan 1, 2023",
      read: "5 min read",
    },
    {
      id: 5,
      title: "Lorem ipsum  venenatis erat porta phasellus",
      writter: "Dieggon",
      date: "Jan 19, 2023",
      read: "8 min read",
    },
    {
      id: 6,
      title:
        "Lorem ipsum dolor sit amet fringilla euismod accumsan sit sollicitudin habitasse libero cubilia dictumst finibus",
      writter: "Marco Polo",
      date: "Jan 2, 2023",
      read: "5 min read",
    },
  ];

  return (
    <div className="mt-24 mx-[1rem] sm:mx-[48px] lg:mx-[64px] xl:mx-[100px] 2xl:mx-[256px]">
      <div className="flex text-center items-center gap-4 mb-7">
        <FontAwesomeIcon icon={faLineChart} />
        <h1 className="font-bold_700">Trending on Akanyz</h1>
      </div>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {postTrending.length === 0 ? (
          <div className="text-center mt-10">
            <h1 className="text-lg font-bold_700">No Post Trending</h1>
          </div>
        ) : (
          postTrending?.map((post, i) => (
            <div key={post + i} className="flex gap-4 mb-6 md:mb-0">
              <div className="">
                <h1 className="text-3xl text-[#e6e6e6] font-bold_700">{`0${
                  i + 1
                }`}</h1>
              </div>
              <div className="">
                <div className="flex text-center items-center gap-3">
                  <Avatar
                    size={28}
                    name={post?.writter}
                    variant={"beam" || "marble"}
                    colors={[
                      "#92A1C6",
                      "#146A7C",
                      "#F0AB3D",
                      "#C271B4",
                      "#C20D90",
                    ]}
                  />
                  <h1 className="text-[13px] font-bold_700">{post.writter}</h1>
                </div>
                <h1 className="text-base font-bold_700 my-2">
                  {post.title.length > 100
                    ? `${post.title.slice(0, 100)} ...`
                    : post.title}
                </h1>
                <div className="flex items-center gap-4">
                  <h1 className="text-f_secondary text-[13px]">{post.date}</h1>
                  <span className="text-f_secondary">•</span>
                  <h1 className="text-f_secondary text-[13px]">{post.read}</h1>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <p className="border border-bold_700 w-full my-14"></p>
    </div>
  );
};

export default Trending;
