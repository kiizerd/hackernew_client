import styled from "styled-components";

export default styled.a`
  cursor: pointer;
  color: rgb(254, 254, 254, 0.9);
  font-size: ${(props) => (props.smallFont ? "10px" : "12px")};
  font-style: ${(props) => (props.smallFont ? "italic" : "normal")};
  white-space: wrap;
  justify-text: left;
  text-align: left;
  overflow: scroll;

  &:visited {
    color: rgb(210, 210, 210, 1);
  }

  &:hover {
    color: rgb(255, 255, 255, 0.975);
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    font-size: ${(props) => (props.smallFont ? "13px" : "15px")};
  }

  @media (min-width: 1024px) {
    font-size: ${(props) => (props.smallFont ? "15px" : "17px")};
  }
`;
