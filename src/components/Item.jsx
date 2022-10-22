import { useState, useEffect } from "react";
import { itemEndpoint } from "../endpoints";

const Item = ({ id }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`${id}`));
    if (storedData) {
      console.log(storedData)
      setData(storedData);
    } else {
      getRemoteItem(id);
    }
  }, []);

  async function getRemoteItem(itemId) {
    const itemResponse = await fetch(itemEndpoint(itemId));
    const item = await itemResponse.json();

    setData(item);
    localStorage.setItem(`${id}`, JSON.stringify(item))
  }

  return <li><div>{data.title}</div></li>;
};

export default Item;
