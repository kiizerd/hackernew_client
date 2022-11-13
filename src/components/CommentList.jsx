import styled from "styled-components";
import CommentItem from "./Item/CommentItem";
import useCollection from "../hooks/useCollection";

const CommentSection = styled.section`
  min-width: 100%;
  background-color: var(--foreground-color);
  position: relative;
  margin-top: 11px;
`;

const StyledList = styled.ul`
  padding: 4px 11px;

  & > li {
    margin: 11px 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CommentList = ({ collection }) => {
  const { currentPage, getChildren, CollectionControls } =
    useCollection(collection);

  const CollectionElement = ({ id }) => (
    <li key={id}>
      <CommentItem id={id} fromTop={0} />
    </li>
  );

  return (
    <CommentSection>
      <CollectionControls />
      <StyledList key={currentPage}>
        {getChildren(CollectionElement)}
      </StyledList>
      <CollectionControls />
    </CommentSection>
  );
};

export default CommentList;
