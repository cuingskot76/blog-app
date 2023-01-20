import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Write = () => {
  const state = useLocation().state;

  const [post, setPost] = useState({
    title: state ? state.title : "",
    subTitle: state ? state.subTitle : "",
    description: state ? state.description : "",
    file: "",
    cat: state ? state.cat?.toLowerCase() : "",
  });

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setPost((prev) => ({
    //   ...prev,
    //   [e.target?.name]: e.target?.value,
    // }));

    setPost((prev) => {
      const prop = e.target?.name;
      if (prev[prop] !== e.target?.value) {
        return { ...prev, [prop]: e.target?.value };
      } else {
        return prev;
      }
    });
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", post.file);
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      await upload();
    } catch (error) {
      console.log(error);
    }
  };

  const [value, setValue] = useState(post?.cat);

  const handleRadioButton = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="my-5">
      <div>
        <input
          type="text"
          placeholder="Title"
          className="input min-w-full max-w-xs mb-5"
          value={post.title}
          name="title"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="sub title"
          className="input min-w-full max-w-xs mb-5"
          value={post.subTitle}
          name="subTitle"
          onChange={handleChange}
        />
      </div>
      <div className="h-[300px]">
        <ReactQuill
          value={post.description}
          className="h-full"
          theme="snow"
          name="description"
          onChange={handleChange}
        />
      </div>

      <input
        type="file"
        className="file-input file-input-bordered file-input-info w-full max-w-xs mt-20"
        onChange={(e) =>
          setPost((prev) => ({ ...prev, file: e.target.files[0] }))
        }
      />

      <h3 className="mt-5">Category</h3>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleRadioButton}
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
      <button className="btn btn-info mt-5" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Write;
