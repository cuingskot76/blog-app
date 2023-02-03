import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/useContext";
import { DateTime } from "luxon";

import Avatar from "boring-avatars";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const { currentUser, accessToken } = useContext(AuthContext);

  console.log(accessToken);

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

  // get date with luxon
  var dt = DateTime.now();
  var f = { month: "short", day: "numeric", year: "numeric" };
  const date = dt.setLocale("en-US").toLocaleString(f);

  return (
    <div className="mt-24 mx-[1rem] sm:mx-[48px] lg:mx-[64px] xl:mx-[128px] 2xl:mx-[256px]">
      <div className="lg:flex justify-between lg:gap-[99px]">
        <div className="flex flex-col mt-5 xl:flex-auto">
          {posts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold_700 text-center">
                No posts found
              </h1>
              <Link to="/write">
                <button className="btn btn-primary mt-5">Create Post</button>
              </Link>
            </div>
          ) : (
            posts?.map((page, i) => (
              <div
                key={i}
                className={`flex flex-row-reverse items-center gap-5 justify-between mb-12 `}
              >
                <div className="max-w-[150px] sm:max-w-[200px] bg-cover">
                  <img
                    src={`../upload/${page?.img}`}
                    alt="img-content"
                    className="w-full h-full bg-cover rounded-sm"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="max-w-[2rem]">
                      {currentUser?.img ? (
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
                    <span className="text-base ml-3 font-bold_700">
                      {page?.writter}
                    </span>
                  </div>
                  <Link to={`/post/${page?.id}`}>
                    <h1 className="text-lg sm:text-2xl font-bold_700 mt-2">
                      {page?.title}
                    </h1>
                    <p className="text-sm sm:text-base text-f_secondary">
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
                    <div className="hidden sm:inline-block">
                      <span className="text-f_secondary mx-2">•</span>
                      <Link to={`/?cat=${page?.cat}`}>
                        <p className="inline bg-[#e6e6e6] text-center items-center px-4 pt-1 pb-2 rounded-[100px]">
                          <span className="text-[13px]">{page?.cat}</span>
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="hidden lg:block xl:flex-1">
          <div className="sticky top-28">
            <div className="">
              <h1 className="text-lg font-bold_700 mb-3">
                Discover more of what metters to you
              </h1>
            </div>
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold_700 text-center">
                  No Category found
                </h1>
              </div>
            ) : (
              <div className="mt-5">
                <div className="max-w-[250px]">
                  {/* {posts?.map((cat, i) => (
                    <Link to={`/?cat=${cat?.cat}`} key={i}>
                      <div className="border border-bold_700 py-2 px-4">
                        <p className="text-sm font-[poppins] text-f_secondary">
                          {cat?.cat}
                        </p>
                      </div>
                    </Link>
                  ))} */}
                  <div className="flex flex-wrap gap-5 ">
                    <Link to={`/?cat=programming`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Programming
                      </p>
                    </Link>
                    <Link to={`/?cat=data-science`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Data Science
                      </p>
                    </Link>
                    <Link to={`/?cat=technology`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Technology
                      </p>
                    </Link>
                    <Link to={`/?cat=self-improvement`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Self Improvement
                      </p>
                    </Link>
                    <Link to={`/?cat=writing`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Writing
                      </p>
                    </Link>
                    <Link to={`/?cat=relationships`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Relationships
                      </p>
                    </Link>
                    <Link to={`/?cat=machine-learning`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Machine Learning
                      </p>
                    </Link>
                    <Link to={`/?cat=politics`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Politics
                      </p>
                    </Link>
                    <Link to={`/?cat=productivity`}>
                      <p className="text-sm font-[poppins] text-f_secondary">
                        Productivity
                      </p>
                    </Link>
                  </div>
                </div>
                <p className="border border-bold_700 my-7"></p>
                <div className="max-w-[250px] xl:max-w-full">
                  <div className="flex flex-wrap gap-4 text-f_secondary">
                    <button>Help</button>
                    <button>Status</button>
                    <button>Careeres</button>
                    <button>Privacy</button>
                    <button>Term</button>
                    <button>About</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
