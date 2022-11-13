import styled from "styled-components";

const PageSelectorList = styled.ul`
  display: flex;
  flex-basis: 1;
  justify-content: flex-end;
  font-size: 0.75rem;
  gap: 7px;
  font-style: italic;
  position: absolute;
  top: 0;
  right: 0;
  margin: 7px;
`;

const PageSelectorItem = styled.li`
  // text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s linear;

  &:hover {
    color: var(--text-greyed);
  }

  & > button {
    all: unset;
  }

  .active {
    text-decoration: underline;
  }
`;

const PerPageSelector = ({ update, current }) => {
  const Item = ({ num, current }) => (
    <PageSelectorItem>
      <button
        className={num == current ? "active" : ""}
        onClick={() => update(num)}
      >
        {num}
      </button>
    </PageSelectorItem>
  );

  return (
    <PageSelectorList>
      <Item current={current} num={16} />
      <Item current={current} num={32} />
      <Item current={current} num={48} />
      <Item current={current} num={64} />
      <span>per page</span>
    </PageSelectorList>
  );
};

export default PerPageSelector;
