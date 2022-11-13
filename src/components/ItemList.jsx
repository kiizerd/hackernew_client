import styled from "styled-components";
import ListItem from "./Item/ListItem";
import useCollection from "../hooks/useCollection";

const List = styled.ul`
  border-top: 1px solid var(--primary-accent-color);
  border-bottom: 1px solid var(--primary-accent-color);
  background-color: var(--foreground-color);
  padding: 2px 0;
`;

const ItemList = ({ collection }) => {
  const { currentPage, getChildren, CollectionControls } =
    useCollection(collection);

  const CollectionElement = ({ id }) => (
    <ListItem key={id} id={id} index={collection.indexOf(id)} />
  );

  return (
    <section style={{ position: "relative" }}>
      <CollectionControls />
      {/* Key prop is necessary to re-render list element when currentPage changes */}
      {/* DO NOT REMOVE -- TRY TO REMEMBER */}
      <List key={currentPage}> {getChildren(CollectionElement)} </List>
      <CollectionControls />
    </section>
  );
};

export default ItemList;
