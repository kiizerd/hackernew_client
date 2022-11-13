import { useEffect, useState } from "react";
import { forageItem } from "../api/storage";
import ReactTimeAgo from "react-time-ago";

const useForagedData = (itemId) => {
  const [data, setData] = useState({});
  const [link, setLink] = useState("");
  const [time, setTime] = useState(false);
  const localURL = `/item/${itemId}`;

  useEffect(() => {
    const getItemData = async () => {
      const item = await forageItem(`${itemId}`);
      setData({
        ...item,
        localURL,
      });
    };

    getItemData();
  }, []);

  useEffect(() => {
    const getItemTime = () => {
      if (data.time && !time) {
        const timestamp = data.time * 1000;
        setTime(<ReactTimeAgo date={timestamp} />);
      }
    };

    const getItemLink = () => {
      if (data.url) {
        const itemURL = new URL(data.url);
        setLink(itemURL);
      } else {
        setLink(localURL);
      }
    };

    getItemLink();
    getItemTime();
  }, [data]);

  return { ...data, link, time };
};

export default useForagedData;
