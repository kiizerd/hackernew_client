import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// https://styled-components.com/docs/api#css
const linkMixin = css`
  font-weight: 500;
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
`;

export default styled.a`
  ${linkMixin}
`;

export const StyledRouterLink = styled(Link)`
  ${linkMixin}
`;
