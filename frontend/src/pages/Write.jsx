import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <div className="my-5">
      <div>
        <input
          type="text"
          placeholder="Title"
          className="input min-w-full max-w-xs mb-5"
        />
      </div>
      <div className="h-[300px]">
        <ReactQuill
          value={value}
          className="h-full"
          theme="snow"
          onChange={setValue}
        />
      </div>

      <input
        type="file"
        className="file-input file-input-bordered file-input-info w-full max-w-xs mt-20"
      />

      <h3 className="mt-5  ">Category</h3>
      <ul className="w-48 text-sm text-blue-800">
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="list-radio-license"
              type="radio"
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="list-radio-license"
              className="w-full py-3 ml-2 text-sm font-medium text-white dark:text-gray-300"
            >
              Driver License{" "}
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="list-radio-id"
              type="radio"
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="list-radio-id"
              className="w-full py-3 ml-2 text-sm font-medium text-white dark:text-gray-300"
            >
              State ID
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="list-radio-millitary"
              type="radio"
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="list-radio-millitary"
              className="w-full py-3 ml-2 text-sm font-medium text-white dark:text-gray-300"
            >
              US Millitary
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="list-radio-passport"
              type="radio"
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="list-radio-passport"
              className="w-full py-3 ml-2 text-sm font-medium text-white dark:text-gray-300"
            >
              US Passport
            </label>
          </div>
        </li>
      </ul>
      <button className="btn btn-info mt-5">Submit</button>
    </div>
  );
};

export default Write;
