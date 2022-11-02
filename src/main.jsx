import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "./routes/Root";
import "./index.css";

// Initialze TimeAgo
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ErrorPage from "./routes/ErrorPage";
import ItemPage from "./routes/ItemPage";
import ListPage from "./routes/ListPage";
import { getCollection, getItem } from "./api/requests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: () => getCollection("best"),
    children: [
      {
        path: "/list/:listName",
        element: <ListPage />,
        loader: ({ params }) => getCollection(params.listName),
      },
      {
        path: "/item/:itemId",
        element: <ItemPage />,
        loader: ({ params }) => getItem(params.itemId),
      },
    ],
  },
]);

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
