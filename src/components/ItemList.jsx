import { useState } from "react";
import styled from "styled-components";
import Item from "./Item";
import PageControls from "./PageControls";

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 5px 2px;
  background-color: #404040;
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
      <Item key={id} id={id} index={collection.indexOf(id)} />
    ));
  };

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
      <hr />
      {controls}
    </section>
  );
};

export default ItemList;
