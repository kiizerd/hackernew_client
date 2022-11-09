import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";

const Button = styled.button`
  margin: 7px 11px;
  padding: 4px 7px;
  border-radius: 3px;
  display: flex;
  align-items: center;

  * {
    stroke: #fff;
  }
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--foreground-color);

  & > i {
    font-size: 0.9rem;
  }
`;

// TODO: Add max page number, and selectable pages
const PageControls = ({ increment, decrement, current }) => {
  return (
    <ControlsRow>
      <Button disabled={current == 0} onClick={decrement}>
        <GrPrevious />
      </Button>
      <i>{current + 1}</i>
      <Button onClick={increment}>
        <GrNext />
      </Button>
      {/* <hr /> */}
    </ControlsRow>
  );
};

export default PageControls;
