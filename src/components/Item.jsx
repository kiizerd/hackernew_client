import { useMatch, useParams } from "react-router-dom";
import ListItem from "./Item/ListItem";
import CommentItem from "./Item/CommentItem";
import ItemPageHeader from "./Item/ItemPageHeader";
import useForagedData from "../hooks/useForagedData";
import useCustomData from "../hooks/useCustomData";

const Item = ({ id, index }) => {
  const data = useForagedData(id);
  const { time, link, localURL } = useCustomData(data);
  const params = useParams();

  // Give all these components an id and the custom hooks instead of data
  // If child of ItemList - move there
  if (useMatch("") || params.listName)
    return <ListItem id={id} index={index} />;
  else {
    switch (data.type) {
      // Move these clowns to ItemPage
      case "story":
        return <ItemPageHeader data={{ ...data, link, localURL, time }} />;
      case "comment":
        return <CommentItem id={id} fromTop={index} />;
      // Find out how this looks on the native site
      case "poll":
        return <div>ima poll</div>;
      case "pollopt":
        return <div>ima pollopt</div>;
      default:
        break;
    }
  }
};

export default Item;
