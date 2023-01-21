import axios from "axios";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import * as luxon from "luxon";

import { AuthContext } from "../context/useContext";

const Write = () => {
  const state = useLocation().state;

  // const [post, setPost] = useState({
  //   title: state ? state.title : "",
  //   subTitle: state ? state.subTitle : "",
  //   description: state ? state.description : "",
  //   file: null,
  //   cat: state ? state.cat?.toLowerCase() : "",
  // });

  const [title, setTitle] = useState(state?.title || "");
  const [subTitle, setSubTitle] = useState(state?.subTitle || "");
  const [description, setDescription] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const [rquill, setRquill] = useState("");

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPost((prev) => ({
  //     ...prev,
  //     [e.target?.name]: e.target?.value,
  //   }));

  //   // setPost((prev) => {
  //   //   const prop = e.target?.name;
  //   //   if (prev[prop] !== e.target?.value) {
  //   //     return { ...prev, [prop]: e.target?.value };
  //   //   } else {
  //   //     return prev;
  //   //   }
  //   // });
  // };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      const imgUrl = await upload();
      // console.log(imgUrl);
      state
        ? await axios.put(
            `http://localhost:8000/api/posts/${state.id}`,
            {
              title: title,
              subTitle: subTitle,
              description: description,
              cat: cat,
              img: file ? imgUrl : "",
              writter: currentUser?.firstName,
              uid: currentUser?.id,
            },
            {
              withCredentials: true,
            }
          )
        : await axios.post(
            "http://localhost:8000/api/posts",
            {
              title: title,
              subTitle: subTitle,
              description: description,
              cat: cat,
              img: file ? imgUrl : "",
              writter: currentUser?.firstName,
              uid: currentUser?.id,
              date: luxon.DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
              // date: luxon.DateTime.fromISO(post?.date).toRelative()
            },
            {
              withCredentials: true,
            }
          );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(typeof luxon.DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"));
  // const updatePost = async (imgUrl) => {
  //   try {

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const createPost = async (imgUrl) => {
  //   try {
  //     await axios.post(
  //       "http://localhost:8000/api/posts",
  //       {
  //         title: post.title,
  //         subTitle: post.subTitle,
  //         description: rquill,
  //         cat: post.cat,
  //         img: post?.file ? imgUrl : "",
  //         writter: currentUser?.firstName,
  //         uid: currentUser?.id,
  //         // get the current date and time with luxon
  //         // date: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(post);

  // const [radio, setRadio] = useState("");

  // const handleRadioButton = (event) => {
  //   setRadio(event.target.value);
  // };

  // console.log(title, subTitle, description, file, cat);

  return (
    <div className="my-5">
      <div>
        <input
          type="text"
          placeholder="Title"
          className="input min-w-full max-w-xs mb-5"
          value={title}
          // name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="sub title"
          className="input min-w-full max-w-xs mb-5"
          value={subTitle}
          // name="subTitle"
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>
      <div className="h-[300px]">
        {/* <ReactQuill
          value={post.description}
          className="h-full"
          theme="snow"
          name="description"
          onChange={handleChange}
        /> */}
        <ReactQuill
          value={description}
          className="h-full"
          theme="snow"
          onChange={setDescription}
        />
      </div>
      <button onClick={upload}>CLICK ME</button>
      <input
        type="file"
        className="file-input file-input-bordered file-input-info w-full max-w-xs mt-20"
        // onChange={(e) =>
        //   setPost((prev) => ({ ...prev, file: e.target.files[0] }))
        // }
        onChange={(e) => setFile(e.target.files[0])}
      />

      <h3 className="mt-5">Category</h3>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <FormControlLabel
            value="programming"
            control={<Radio />}
            label="programming"
          />
          <FormControlLabel
            value="technology"
            control={<Radio />}
            label="technology"
          />
          <FormControlLabel
            value="writing"
            control={<Radio />}
            label="writing"
          />
          <FormControlLabel
            value="productivity"
            control={<Radio />}
            label="productivity"
          />
          <FormControlLabel
            value="politics"
            control={<Radio />}
            label="politics"
          />
        </RadioGroup>
      </FormControl>
      <button className="btn btn-info mt-5" onClick={() => handleClick()}>
        Submit
      </button>
    </div>
  );
};

export default Write;
