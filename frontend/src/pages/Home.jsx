import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/useContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [cat]);
  // const posts = [
  //   {
  //     id: 1,
  //     title: "lorem ipsum dolor sit amet",
  //     subTitle: "lorem ipsum dolor sit amet mollis  ",
  //     desc: "Lorem ipsum dolor sit amet mollis vivamus conubia litora nec placerat convallis sollicitudin mus siasdfasdf",
  //     img: "https://source.unsplash.com/random/300x300",
  //     writter: "John Doe",
  //     date: "Jan 1, 2023",
  //     read: "2 min read",
  //   },
  //   {
  //     id: 2,
  //     title: "lorem ipsum ",
  //     subTitle: "lorem ipsum dolor sit amet mollis  vivamus ",
  //     desc: "Lorem it. Quisquam, ",
  //     img: "https://source.unsplash.com/random/300x300",
  //     writter: "Mark  Schaefer",
  //     date: "Jan 12, 2023",
  //     read: "12 min read",
  //   },
  //   {
  //     id: 3,
  //     title: "lorem ipsum dolor sit amet",
  //     subTitle: "lorem ipsum dolor sit amet   vivamus conubia",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
  //     img: "https://source.unsplash.com/random/300x300",
  //     writter: "Luke Smith",
  //     date: "Jan 10, 2023",
  //     read: "4 min read",
  //   },
  // ];

  return (
    <div className="">
      <div className="flex flex-col mt-5">
        {posts.map((page, i) => (
          <div
            key={i}
            className={`flex flex-row-reverse items-center gap-5 justify-between md:justify-evenly mb-10`}
          >
            <div className="max-w-[200px]">
              <img
                src={page?.img}
                alt="img-content"
                className="w-full rounded-sm"
              />
            </div>
            <div className="w-fit md:max-w-md">
              <div className="flex items-center mb-3">
                <div className="max-w-[2rem]">
                  <img
                    src={page?.img}
                    alt="user-img"
                    className="rounded-full"
                  />
                </div>
                <span className="text-gray-400 ml-2">{page?.writter}</span>
              </div>
              <h1 className="text-2xl font-bold">{page?.title}</h1>
              <p className="text-gray-400">
                {page?.subTitle.length >= 100
                  ? page?.subTitle.substring(0, 50) + "..."
                  : page?.subTitle}
              </p>
              <div className="mt-2">
                <span className="text-gray-400">{page?.date}</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-400">{page?.read}</span>
              </div>
              <Link to={`/post/${page?.id}`}>
                <button className="btn btn-outline btn-info mt-5">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
