import styled from "styled-components";

export default styled.li`
  display: flex;
  align-items: start;
  margin: 5px;
  padding: 5px;
  background-color: #553535;
  font-size: 11px;
  gap: 3px;
  outline: 1px solid transparent;
  transition: outline 0.3s linear;

  &:hover {
    outline: 1px solid #242424;
  }

  @media (min-width: 768px) {
    font-size: 13px;
    gap: 5px;
  }
`;
