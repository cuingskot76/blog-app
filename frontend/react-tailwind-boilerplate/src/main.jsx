import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UseContextProvider } from "./context/useContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UseContextProvider>
      <App />
    </UseContextProvider>
  </React.StrictMode>
);
