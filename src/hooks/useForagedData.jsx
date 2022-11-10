import { useEffect, useState } from "react";
import { forageItem } from "../api/storage";

export default (itemId) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getItemData = async () => {
      const item = await forageItem(`${itemId}`);
      setData({ ...item, localURL: `/item/${itemId}` });
    };

    getItemData();
  }, []);

  return data;
};
