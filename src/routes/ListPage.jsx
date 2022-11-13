import { useLoaderData } from "react-router-dom";
import ItemList from "../components/ItemList";

const ListPage = () => {
  const collection = useLoaderData();

  return <ItemList collection={collection} />;
};

export default ListPage;
