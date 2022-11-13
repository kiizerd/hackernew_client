import { useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../components/CommentList";
import ItemPageHeader from "../components/Item/ItemPageHeader";

const StyledItemPage = styled.div``;

const ItemBody = styled.p`
  background-color: var(--foreground-color);
  margin-top: 0;
  padding: 11px;
  font-size: 0.85rem;
`;

const ItemPage = () => {
  const itemId = useParams().itemId;
  const itemData = useLoaderData();

  return (
    <StyledItemPage>
      <ItemPageHeader id={itemId} />
      {itemData.text ? (
        <ItemBody dangerouslySetInnerHTML={{ __html: itemData.text }} />
      ) : null}
      {itemData.kids ? <CommentList collection={itemData.kids} /> : null}
    </StyledItemPage>
  );
};

export default ItemPage;
