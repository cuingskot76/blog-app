import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/useContext";
import { DateTime } from "luxon";

import Avatar from "boring-avatars";

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

  console.log(posts);

  // get date with luxon
  var dt = DateTime.now();
  var f = { month: "short", day: "numeric", year: "numeric" };
  const date = dt.setLocale("en-US").toLocaleString(f);

  return (
    <div className="mt-24">
      <div className="flex flex-col mt-5">
        {posts === 0 ? (
          posts.map((page, i) => (
            <div
              key={i}
              className={`flex flex-row-reverse items-center gap-5 justify-between md:justify-evenly mb-[58px]`}
            >
              <div className="max-w-[200px]">
                <img
                  src={`../upload/${page?.img}`}
                  alt="img-content"
                  className="w-full rounded-sm"
                />
              </div>
              <div className="w-fit md:max-w-md">
                <div className="flex items-center mb-3">
                  <div className="max-w-[2rem]">
                    {page?.img ? (
                      <img
                        src={`../upload/${page?.img}`}
                        alt="user-img"
                        className="rounded-full w-[28px]"
                      />
                    ) : (
                      <Avatar
                        size={28}
                        name={page?.writter}
                        variant={"beam" || "marble"}
                        colors={[
                          "#92A1C6",
                          "#146A7C",
                          "#F0AB3D",
                          "#C271B4",
                          "#C20D90",
                        ]}
                      />
                    )}
                  </div>
                  <span className="font-bold_600 text-sm ml-3">
                    {page?.writter}
                  </span>
                </div>
                <Link to={`/post/${page?.id}`}>
                  <h1 className="text-2xl font-bold_700 ">{page?.title}</h1>
                  <p className="text-f_secondary">
                    {page?.subTitle.length >= 100
                      ? page?.subTitle.substring(0, 50) + "..."
                      : page?.subTitle}
                  </p>
                </Link>
                <div className="mt-2">
                  <span className="text-f_secondary text-[13px]">{date}</span>
                  <span className="text-f_secondary mx-2">•</span>
                  {
                    <span className="text-f_secondary text-[13px]">
                      {`${Math.ceil(
                        page?.description?.split(" ").length / 200
                      )} min read`}
                    </span>
                  }
                  <span className="text-f_secondary mx-2">•</span>
                  <Link to={`/?cat=${page?.cat}`}>
                    <p className="inline bg-[#e6e6e6] px-2 py-1 rounded-[100px]">
                      <span className="text-[13px]">{page?.cat}</span>
                    </p>
                  </Link>
                </div>
                {/* <Link to={`/post/${page?.id}`}>
                <button className="btn btn-outline btn-info mt-5">
                  Read more
                </button>
              </Link> */}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold_700 text-center">
              No posts found
            </h1>
            <Link to="/write">
              <button className="btn btn-primary mt-5">Create Post</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
