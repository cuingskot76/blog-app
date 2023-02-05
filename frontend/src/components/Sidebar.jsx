import React from "react";

const Sidebar = ({ img, userDesc, followers, writter }) => {
  const totalFollower = [];

  if (followers > 1000) {
    totalFollower.push(<p>{(followers / 1000).toFixed(1) + " K Followers"}</p>);
  } else if (followers > 1) {
    totalFollower.push(<p>{followers + " Followers"}</p>);
  } else {
    totalFollower.push(<p>{followers + " Follower"}</p>);
  }

  const pages = [
    {
      id: 1,
      title: "lorem ipsum dolor sit amet",
      subTitle: "lorem ipsum dolor sit amet mollis  ",
      desc: "Lorem ipsum dolor sit amet mollis vivamus conubia litora nec placerat convallis sollicitudin mus siasdfasdf",
      img: "https://source.unsplash.com/random/300x300",
      writter: "John Doe",
      date: "Jan 1, 2023",
      read: "2 min read",
    },
    {
      id: 2,
      title: "lorem ipsum ",
      subTitle: "lorem ipsum dolor sit amet mollis  vivamus ",
      desc: "Lorem it. Quisquam, ",
      img: "https://source.unsplash.com/random/300x300",
      writter: "Mark  Schaefer",
      date: "Jan 12, 2023",
      read: "12 min read",
    },
    {
      id: 3,
      title: "lorem ipsum dolor sit amet",
      subTitle: "lorem ipsum dolor sit amet   vivamus conubia",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      img: "https://source.unsplash.com/random/300x300",
      writter: "Luke Smith",
      date: "Jan 10, 2023",
      read: "4 min read",
    },
  ];

  return (
    <div className="bg-[#1E293B] max-w-md h-screen fixed top-[5rem] right-0 z-1">
      <div className="max-w-[7rem]">
        <img src={img} alt="user-img" className="rounded-full bg-cover" />
      </div>
      <div className="my-3">
        <p>{writter}</p>
        {totalFollower}
      </div>
      <p>{userDesc}</p>
      <div>
        <button className="btn btn-success mt-3">Follow</button>
      </div>
      <div>
        <h2 className="font-bold text-xl my-5">Other Posts you may like</h2>
        {pages.map((page, i) => (
          <div
            key={page + i}
            className={`flex flex-row-reverse items-center gap-5 justify-between md:justify-evenly mb-10`}
          >
            <div className="max-w-[200px]">
              <img
                src={page.img}
                alt="img-content"
                className="w-full rounded-sm"
              />
            </div>
            <div className="w-fit md:max-w-md">
              <div className="flex items-center mb-3">
                <div className="max-w-[2rem]">
                  <img src={page.img} alt="user-img" className="rounded-full" />
                </div>
                <span className="text-gray-400 ml-2">{page.writter}</span>
              </div>
              <h1 className="text-2xl font-bold">{page.title}</h1>
              <p className="text-gray-400">
                {page.subTitle.length >= 100
                  ? page.subTitle.substring(0, 50) + "..."
                  : page.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
