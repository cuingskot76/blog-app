import axios from "axios";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import * as luxon from "luxon";

import { AuthContext } from "../context/useContext";

const Write = () => {
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [subTitle, setSubTitle] = useState(state?.subTitle || "");
  const [description, setDescription] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const { currentUser } = useContext(AuthContext);

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
      const res = (await state)
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
            },
            {
              withCredentials: true,
            }
          );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-24 container mx-auto px-2 sm:px-4 py-2.5 font-[poppins]">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-1 flex-col">
          <div>
            <input
              type="text"
              placeholder="Title"
              className="input min-w-full max-w-xs mb-5 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="sub title"
              className="input min-w-full max-w-xs mb-5 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
          <div className="h-[300px]">
            <ReactQuill
              value={description}
              className="h-full"
              theme="snow"
              onChange={setDescription}
            />
          </div>
        </div>
        <div className="flex flex-initial flex-col">
          <input
            type="file"
            className="file-input file-input-bordered file-input-info w-full max-w-xs mt-20  min-w-full  mb-5 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
      </div>
    </div>
  );
};

export default Write;
