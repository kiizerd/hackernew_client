import { useLoaderData, useParams } from "react-router-dom";
import Item from "../components/Item";

const ItemPage = () => {
  const itemId = useParams().itemId
  const itemData = useLoaderData();

  return <Item id={itemId} />;
};

export default ItemPage;
