import styled from "styled-components";

const Button = styled.button`
  font-size: 1rem;
  margin: 2px 1rem;
  padding: 4px 10px;
  border: 2px solid slategray;
  border-radius: 3px;
`;

const PageControls = ({ increment, decrement, current }) => {
  return (
    <div>
      <Button disabled={current == 0} onClick={decrement}>
        -
      </Button>
      <span>{current + 1}</span>
      <Button onClick={increment}>+</Button>
      <hr />
    </div>
  );
};

export default PageControls;
