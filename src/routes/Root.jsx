import { Outlet, useMatch } from "react-router-dom";
import Header from "../components/Header";
import ListPage from "./ListPage";
import { collectionEndpoints } from '../api/requests'

const onHomePage = () => {
  return useMatch("");
};

const Root = () => {
  return (
    <>
      <Header lists={Object.keys(collectionEndpoints)} />
      {onHomePage() ? <ListPage /> : <Outlet />}
    </>
  );
};

export default Root;
