import { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import styled from "styled-components";
import { itemEndpoint, userEndpoint } from "../endpoints";

const ListItem = styled.li`
  display: flex;
  height: 3rem;
  align-items: start;
  margin: 5px;
  padding: 5px;
  background-color: #553535;
  font-size: 12px;
  gap: 6px;
  outline: 1px solid transparent;
  transition: outline 0.3s linear;

  &:hover {
    outline: 1px solid #242424;
  }
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

const ItemCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 5px;
`;

const Item = ({ id, index }) => {
  const [data, setData] = useState({});
  const [link, setLink] = useState("");
  const [time, setTime] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`${id}`));
    if (storedData) {
      setData(storedData);
    } else {
      getRemoteItem(id);
    }
  }, []);

  // When data is set...
  // Store link and date separately to allow use of JS api's
  useEffect(() => {
    // If there isn't a URL,
    // we need to generate a page displaying data.text
    if (data.url) {
      const itemURL = new URL(data.url);
      setLink(itemURL);
    } else console.log(data);

    if (data.time) {
      setTime(<ReactTimeAgo date={new Date(data.time * 1000)} />);
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
      <span>{index + 1}.</span>
      <ItemCol>
        <ItemRow>
          {data.url ? (
            <>
              <Link href={data.url}>{data.title}</Link>
              <span>({link ? link.host : false})</span>
            </>
          ) : (
            // Replace with react-route
            <Link href="">{data.title}</Link>
          )}
        </ItemRow>
        <ItemRow>
          <span>{data.score} points by</span>
          <Link smallFont href={userEndpoint(data.by)}>
            {data.by}
          </Link>
          <span>|</span>
          {time}
        </ItemRow>
      </ItemCol>
    </ListItem>
  );
};

export default Item;
