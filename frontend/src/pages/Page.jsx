import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/useContext";
import { DateTime } from "luxon";
import * as luxon from "luxon";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Avatar from "boring-avatars";

const Page = () => {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { currentUser, accessToken, axiosAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postId}`
        );
        setPost(res?.data);
        console.log(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [postId]);

  // get the read time from the post decsription
  const wordPerMinute = 200;
  const words = post?.description?.split(" ").length;
  const minutes = words / wordPerMinute;
  const readTime = Math.ceil(minutes);

  // get cookie from user when user login

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(postId);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/api/auth/token");
  //     setToken(res?.data?.accessToken);
  //     const decoded = jwt_decode(res?.data?.accessToken);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log();

  // get date with luxon
  var dt = DateTime.now();
  var f = { month: "short", day: "numeric", year: "numeric" };
  const date = dt.setLocale("en-US").toLocaleString(f);

  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-7">
            <div className="max-w-[2rem]">
              {post?.userImg ? (
                <img
                  src={`../upload/${post?.img}`}
                  alt="user-img"
                  className="rounded-full w-[50px]"
                />
              ) : (
                <Avatar
                  size={50}
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
              )}
            </div>

            <div className="flex flex-col">
              <span className="">{post?.writter}</span>
              {/* <span className="mb-2">{post?.firstName}</span> */}
              <div>
                <span className="text-gray-400">
                  <span className="text-gray-400 text-[14px]">{date}</span>
                </span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-400 text-[14px]">{`${
                  readTime === 1
                    ? `${readTime} min read`
                    : `${readTime} min read`
                } `}</span>
                {/* <span>{date}</span> */}
              </div>
            </div>

            <div>
              {
                // if the user is logged in and the user is the owner of the post
                currentUser?.email === post?.email ? (
                  <>
                    <Link to={`/write?edit=${postId}`} state={post}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={handleDeletePost}
                      className="cursor-pointer ml-5"
                    ></FontAwesomeIcon>
                  </>
                ) : null
              }
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-2xl font-bold">{post?.title}</h1>
            <p className="text-gray-400">{post?.subTitle}</p>
          </div>
          <div className="max-w-[25rem]">
            <img
              // src={post?.img}
              src={`../upload/${post?.img}`}
              alt="hero-img"
              className="w-full rounded-sm my-5 "
            />
          </div>
          <p className="max-w-md">{post?.description}</p>
          {post?.cat ? (
            <p className="bg-blue-400 w-fit rounded-md py-1 px-2 mt-5">
              {post?.cat}
            </p>
          ) : null}
        </div>
        <div className="hidden lg:block">
          <Sidebar {...post} />
        </div>
      </div>
    </div>
  );
};

export default Page;
