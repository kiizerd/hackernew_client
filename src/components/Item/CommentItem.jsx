import styled from "styled-components";
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { BarLoader } from "react-spinners";
import { userEndpoint } from "../../api/requests";
import StyledLink from "../StyledLink";
import useForagedData from "../../hooks/useForagedData";

const CommentHeader = styled.div`
  gap: 11px;
  display: flex;
  padding: 2px 7px;
  font-size: 0.8rem;
  align-items: center;
  background-color: var(
    ${(props) =>
      ((props.fromTop % 2) + 1) % 2 == 0
        ? "--primary-offset-color"
        : "--primary-color"}
  );
  border: 0 solid var(--primary-accent-color);
  border-left-width: 1px;
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
  margin-left: ${(props) => (props.fromTop == 0 ? "0" : "11px")};
`;

const CommentChild = ({ id, index }) => <CommentItem id={id} fromTop={index} />;
const CommentItem = ({ id, fromTop }) => {
  const { by, text, time, ...data } = useForagedData(id);
  const [hidden, setHidden] = useState(true);

  const toggleHide = async () => {
    setHidden(!Boolean(hidden));
  };

  const ToggleButton = () => (
    <Toggle onClick={toggleHide}>{hidden ? <BiShowAlt /> : <BiHide />}</Toggle>
  );

  const ReplyCount = ({ count }) =>
    count ? `(${count} repl${count == 1 ? "y" : "ies"})` : null;

  const CommentBody = () => (
    <CommentParagraph
      isTopComment={fromTop == 0}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );

  const Replies = ({ list }) =>
    list.map((id) => <CommentChild key={id} id={id} index={fromTop + 1} />);

  if (!id || data.dead || data.deleted) return null;
  if (!by || !text) {
    return (
      <BarLoader
        color="var(--primary-accent-color)"
        height={2}
        cssOverride={{ marginLeft: "11px" }}
      />
    );
  }

  return (
    <Comment fromTop={fromTop}>
      <CommentHeader fromTop={fromTop}>
        <ToggleButton />
        <StyledLink italic href={userEndpoint(by)}>
          {by}
        </StyledLink>
        {time}
        <ReplyCount count={data.kids?.length} />
      </CommentHeader>
      {hidden ? null : (
        <>
          <CommentBody />
          {data.kids ? <Replies list={data.kids} /> : null}
        </>
      )}
    </Comment>
  );
};

export default CommentItem;
