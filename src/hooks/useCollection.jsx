import { useEffect, useState } from "react";
import PageControls from "../components/PageControls";
import PerPageSelector from "../components/PerPageSelector";
import calcMaxPage from "../helpers/calcMaxPage";

const useCollection = (collection) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(16);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [collection]);

  useEffect(() => {
    const len = collection.length;
    const newMax = calcMaxPage(len, perPage);
    setMaxPage(newMax);

    if (currentPage > newMax) setCurrentPage(newMax);
  }, [perPage]);

  const getSubCollection = (page) => {
    const startIndex = page * perPage;
    const endIndex = (page + 1) * perPage;

    return collection.slice(startIndex, endIndex);
  };

  const getChildren = (CollectionElement) => {
    const subCollection = getSubCollection(currentPage);

    return subCollection.map((id) => (
      <CollectionElement key={id} id={id} index={collection.indexOf(id)} />
    ));
  };

  const CollectionControls = () => (
    <>
      <PageControls
        current={currentPage}
        max={maxPage}
        update={setCurrentPage}
      />
      <PerPageSelector current={perPage} update={setPerPage} />
    </>
  );

  return { currentPage, getChildren, CollectionControls };
};

export default useCollection;
