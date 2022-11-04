import { createBrowserRouter } from "react-router-dom";
import { forageCollection, forageItem } from "./api/storage";
import ErrorPage from "./routes/ErrorPage";
import ItemPage from "./routes/ItemPage";
import ListPage from "./routes/ListPage";
import Root from "./routes/Root";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: () => forageCollection("best"),
    children: [
      {
        path: "/list/:listName",
        element: <ListPage />,
        loader: ({ params }) => forageCollection(params.listName),
      },
      {
        path: "/item/:itemId",
        element: <ItemPage />,
        loader: ({ params }) => forageItem(params.itemId),
      },
    ],
  },
]);
