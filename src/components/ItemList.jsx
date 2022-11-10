import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ListItem from "./Item/ListItem";
import PageControls from "./PageControls";

const List = styled.ul`
  border-top: 1px solid var(--primary-accent-color);
  border-bottom: 1px solid var(--primary-accent-color);
  background-color: var(--foreground-color);
  padding: 2px 0;
`;

const ItemList = ({ collection, perPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const currentItemIds = (page) => {
    const startIndex = page * perPage;
    const endIndex = (page + 1) * perPage;

    return collection.slice(startIndex, endIndex);
  };

  const currentItems = (page) => {
    const ids = currentItemIds(page);

    return ids.map((id) => (
      <ListItem key={id} id={id} index={collection.indexOf(id)} />
    ));
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [collection])

  const incrementPage = () => setCurrentPage(currentPage + 1);
  const decrementPage = () => setCurrentPage(currentPage - 1);
  const controls = (
    <PageControls
      increment={incrementPage}
      decrement={decrementPage}
      current={currentPage}
    />
  );

  return (
    <section>
      {controls}
      {/* Key prop is necessary to re-render list element when currentPage changes */}
      {/* DO NOT REMOVE -- TRY TO REMEMBER */}
      <List key={currentPage}> {currentItems(currentPage)} </List>
      {controls}
    </section>
  );
};

export default ItemList;
