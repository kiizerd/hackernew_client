import { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import { itemEndpoint, userEndpoint } from "../api/requests";
import ListItem from "./Item/ListItem";
import ItemCol from "./Item/ItemCol";
import ItemRow from "./Item/ItemRow";
import StyledLink, { StyledRouterLink } from "./StyledLink";

const Item = ({ id, index }) => {
  const [data, setData] = useState({});
  const [link, setLink] = useState("");
  const [time, setTime] = useState(false);
  const [localURL, setLocalURL] = useState("");

  // TODO: Try to rewrite these complex 'useEffect's as custom hooks

  // if item exists in local storage, read it
  // otherwise make a new fetch request
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`${id}`));
    if (storedData) {
      setData(storedData);
    } else {
      getRemoteItem(id);
    }
  }, []);

  // When data is set...
  // Store link and time separately to allow use of JS apis
  useEffect(() => {
    if (data.time && !Boolean(time)) {
      setTime(<ReactTimeAgo date={new Date(data.time * 1000)} />);
    }
    // If there isn't a URL,
    // we need to generate a page displaying data.text
    if (data.url) {
      const itemURL = new URL(data.url);
      setLink(itemURL);
      setLocalURL(`/item/${id}`);
    } else {
      setLink(`/item/${id}`);
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
      {index || index === 0 ? <span>{index + 1}.</span> : null}
      <ItemCol>
        <ItemRow>
          {/* If an external url exists... */}
          {data.url ? (
            <>
              {/* Use a regular styled `a` tag */}
              <StyledLink target="_blank" href={data.url}>
                {data.title}
              </StyledLink>
              <span>{link ? `(${link.host})` : false}</span>
            </>
          ) : (
            // Use styled react-router `Link` tag
            <StyledRouterLink to={link}>{data.title}</StyledRouterLink>
          )}
        </ItemRow>
        <ItemRow greyed>
          <span>{data.score} points by</span>
          <StyledLink smallFont href={userEndpoint(data.by)}>
            {data.by}
          </StyledLink>
          <span>|</span>
          {time}
          <span>|</span>
          <StyledRouterLink smallFont to={localURL}>
            {data.descendants} comments
          </StyledRouterLink>
        </ItemRow>
      </ItemCol>
    </ListItem>
  );
};

export default Item;
