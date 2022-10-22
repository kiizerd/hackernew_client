import { useEffect, useState } from "react";
import Item from "./Item";

const PageControls = ({ increment, decrement, current }) => {
  return (
    <div>
      <button disabled={current == 0} onClick={decrement}>
        - 1
      </button>
      <span>{current}</span>
      <button onClick={increment}>+ 1</button>
    </div>
  );
};

const ItemList = ({ endpoint, perPage }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getCollection();
  }, []);

  async function getCollection() {
    const response = await fetch(endpoint);
    const collectionIds = await response.json();
    console.log(endpoint, collectionIds);

    setCollection(collectionIds);
  }

  const currentItemIds = (page) => {
    const startIndex = page * perPage;
    const endIndex = (page + 1) * perPage;

    return collection.slice(startIndex, endIndex);
  };

  const currentItems = (page) => {
    const ids = currentItemIds(page);

    return ids.map((id) => <Item key={id} id={id} />);
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
      <ul key={currentPage}> {currentItems(currentPage)} </ul>
      {controls}
    </section>
  );
};

export default ItemList;
