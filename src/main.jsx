import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

// Initialze TimeAgo
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import router from "./router";

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
