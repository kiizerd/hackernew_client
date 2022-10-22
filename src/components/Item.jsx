import { useState, useEffect } from "react";
import { itemEndpoint } from "../endpoints";

const Item = ({ id }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getRemoteItem(id);
  }, []);

  async function getRemoteItem(itemId) {
    const itemResponse = await fetch(itemEndpoint(itemId));
    const item = await itemResponse.json();

    setData(item);
  }

  return <li><div>{data.title}</div></li>;
};

export default Item;
