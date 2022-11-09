import { useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentItem from "../components/Item/CommentItem";
import ItemPageHeader from "../components/Item/ItemPageHeader";

const StyledItemPage = styled.div``;

const ItemBody = styled.p`
  background-color: var(--foreground-color);
  margin-top: 0;
  padding: 11px;
  font-size: 0.85rem;
`;

const CommentList = styled.ul`
  background-color: var(--foreground-color);
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
      {itemData.kids ? (
        <CommentList>
          {itemData.kids.map((id, index) => {
            return (
              <li key={index}>
                <CommentItem id={id} fromTop={0} />
              </li>
            );
          })}
        </CommentList>
      ) : null}
    </StyledItemPage>
  );
};

export default ItemPage;
