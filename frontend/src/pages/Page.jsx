import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/useContext";
import { DateTime } from "luxon";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { currentUser, token } = useContext(AuthContext);
  // console.log(currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postId}`
        );
        setPost(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [postId]);

  // get date from the post "some time ago" with luxon
  const date = DateTime.fromISO(post?.date).toRelative();
  console.log(currentUser);
  // get the read time from the post
  // let readTime = 0;
  // const readingSpeed = 200;
  // const getWord2 = 200;
  // const getWord = post?.description?.split(" ").length;
  // getWord < readingSpeed
  //   ? `${(readTime = getWord / readingSpeed)} sec read `
  //   : (readTime = getWord * readingSpeed);

  // get cookie from user when user login
  const handleDeletePost = async () => {
    try {
      // await axios.delete(`http://localhost:8000/api/posts/${postId}`);
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPost(res?.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <div className="">
          <div className="flex items-center gap-5">
            <div className="max-w-[3rem]">
              <img
                src={post?.img}
                alt="user-img"
                className="rounded-full bg-cover"
              />
            </div>
            <div className="flex flex-col ">
              <span className="mb-2">{post?.writter}</span>
              {/* <span className="mb-2">{post?.firstName}</span> */}
              <div>
                <span className="text-gray-400">
                  {/* {DateTime.now().plus(post?.date).toRelativeCalendar()} */}
                </span>
                <span className="text-gray-400 mx-2">•</span>
                {/* <span className="text-gray-400">{`${readTime}`}</span> */}
                <span>{date}</span>
              </div>
            </div>
          </div>

          <div>
            {
              // if the user is logged in and the user is the owner of the post
              currentUser?.email === post?.email ? (
                <>
                  <Link to={`/write?edit=${postId}`}>
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

          <div className="my-5">
            <h1 className="text-2xl font-bold">{post?.title}</h1>
            <p className="text-gray-400">{post?.subTitle}</p>
          </div>
          <div className="max-w-[25rem]">
            <img
              src={post?.img}
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
