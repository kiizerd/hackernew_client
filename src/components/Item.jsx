import { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import styled from "styled-components";
import { itemEndpoint, userEndpoint } from "../endpoints";

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  height: 3rem;
  align-items: start;
  margin: 5px;
  padding: 5px;
  background-color: #303030;
  font-size: 12px;
`;

const Link = styled.a`
  cursor: pointer;
  color: rgb(254, 254, 254, 0.85);
  font-size: ${(props) => (props.smallFont ? "12px" : "14px")};
  font-style: ${(props) => (props.smallFont ? "italic" : "normal")};

  &:visited {
    color: rgb(248, 248, 248, 0.68);
  }

  &:hover {
    color: rgb(255, 255, 255, 0.975);
    text-decoration: underline;
  }
`;

const ItemRow = styled.div`
  display: flex;
  gap: 5px;
  margin-left: ${(props) => (props.leftMargin ? "16px" : "0")};
`;

const Item = ({ id, index }) => {
  const [data, setData] = useState({});
  const [link, setLink] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`${id}`));
    if (storedData) {
      setData(storedData);
    } else {
      getRemoteItem(id);
    }
  }, []);

  // Store link separately to allow use of JS URl
  useEffect(() => {
    if (data.url) {
      const itemURL = new URL(data.url);
      setLink(itemURL);
    }
  }, [data]);

  async function getRemoteItem(itemId) {
    const itemResponse = await fetch(itemEndpoint(itemId));
    const item = await itemResponse.json();

    setData(item);
    localStorage.setItem(`${id}`, JSON.stringify(item));
  }

  return (
    <ListItem>
      <ItemRow>
        <span>{index + 1}.</span>
        <Link href={data.url}>{data.title}</Link>
        <span>({link ? link.host : false})</span>
      </ItemRow>
      <ItemRow leftMargin>
        <span>{data.score} points by</span>
        <Link smallFont href={userEndpoint(data.by)}>
          {data.by}
        </Link>
        <span>|</span>
        <ReactTimeAgo date={new Date(data.time * 1000)} locale="en-US" />
      </ItemRow>
    </ListItem>
  );
};

export default Item;
