import styled from "styled-components";

export default styled.div`
  display: flex;
  gap: 5px;
  color: ${(props) => (props.greyed ? "#9aa" : "#eff")};
`;
