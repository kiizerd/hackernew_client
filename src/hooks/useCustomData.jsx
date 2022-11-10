import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

export default (data) => {
  const [link, setLink] = useState("");
  const [time, setTime] = useState(false);
  // const [localURL, setLocalURL] = useState("");

  useEffect(() => {
    if (data.time && !time) {
      setTime(<ReactTimeAgo date={new Date(data.time * 1000)} />);
    }

    if (data.url) {
      const itemURL = new URL(data.url);
      setLink(itemURL);
    } else {
      setLink(`/item/${data.id}`);
    }
    
    // setLocalURL(`/item/${data.id}`);
  }, [data]);

  return { time, link };
};
