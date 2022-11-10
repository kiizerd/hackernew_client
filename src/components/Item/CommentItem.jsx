import styled from "styled-components";
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { BarLoader } from "react-spinners";
import { userEndpoint } from "../../api/requests";
import Item from "../Item";
import StyledLink from "../StyledLink";
import useCustomData from "../../hooks/useCustomData";
import useForagedData from "../../hooks/useForagedData";

const CommentHeader = styled.div`
  gap: 7px;
  display: flex;
  padding: 2px 7px;
  font-size: 0.9rem;
  align-items: center;
  background-color: var(--primary-color);
  border: 0 solid var(--primary-accent-color);
  border-left-width: 1px;

  & > a {
    &::after {
    }
  }
`;

const Toggle = styled.button`
  margin: 4px;
  display: flex;
  padding: auto;
  font-weight: 500;
  align-items: center;
  line-height: 1rem;
`;

const CommentParagraph = styled.p`
  padding: 0.75rem 1.5rem;
  margin-top: 0;
  font-size: 0.75rem;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--primary-accent-color);
  margin-bottom: 0;
`;

const Comment = styled.div`
  margin: ${(props) => (props.fromTop == 0 ? "4px" : "0 4px")};
  margin-left: ${(props) => props.fromTop * 6 + 4}px;
`;

export default ({ id, fromTop }) => {
  const { by, text, ...data } = useForagedData(id);
  const { time } = useCustomData(data);
  const [hidden, setHidden] = useState(fromTop > 1);

  const toggleHide = async () => {
    setHidden(!Boolean(hidden));
  };

  return by && text ? (
    <Comment fromTop={fromTop}>
      <CommentHeader hidden={hidden ? true : undefined}>
        <StyledLink italic href={userEndpoint(by)}>
          {by}
        </StyledLink>
        {time}
        <Toggle onClick={toggleHide}>
          {hidden ? <BiShowAlt /> : <BiHide />}
        </Toggle>
      </CommentHeader>
      {hidden ? null : (
        <CommentParagraph
          isTopComment={fromTop == 0}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      {!hidden && data.kids
        ? data.kids.map(
            (id, index) =>
              fromTop < 2 && <Item key={index} id={id} index={fromTop + 1} />
          )
        : null}
    </Comment>
  ) : (
    <BarLoader color="var(--primary-accent-color)" height={1} />
  );
};
