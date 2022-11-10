import styled from "styled-components";
import StyledLink, { StyledRouterLink } from "../StyledLink";
import { userEndpoint } from "../../api/requests";

const ItemDetailRow = styled.div`
  font-size: 0.75rem;
  display: flex;
  gap: 7px;
  color: var(--text-secondary);
`;

const CommentsLink = ({ count, url }) =>
  !!count && (
    <>
      <span>|</span>
      <StyledRouterLink to={url}>{`${count} comments`}</StyledRouterLink>
    </>
  );

const ItemDetails = ({ data }) => {
  const { by, descendants, localURL, score, time } = data;

  return (
    <ItemDetailRow>
      <span>{score} points by</span>
      <StyledLink italic href={userEndpoint(by)}>
        {by}
      </StyledLink>
      <span>|</span>
      {time}
      <CommentsLink count={descendants} url={localURL} />
    </ItemDetailRow>
  );
};

export default ItemDetails;
