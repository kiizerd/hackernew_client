import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  background-color: var(--primary-color);
  border-bottom: 1px solid var(--primary-accent-color);
  padding: 0 4px;
  gap: 7px;

  @media (min-width: 768px) {
    gap: 11px;
  }
`;

const Title = styled(Link)`
  color: white;

  &:visited {
    color: white;
  }
`;

const HeaderList = styled.ul`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-top: 2px;

  @media (min-width: 768px) {
    font-size: 13px;
  }

  // Add a separator after every child but last
  li {
    * {
      color: white;
    }

    &:after {
      margin: 4px;
      content: "|";
    }

    &:last-child {
      &:after {
        margin: 0;
        content: "";
      }
    }
  }

  .active {
    text-decoration: underline;
  }
`;

const Header = ({ lists }) => (
  <StyledHeader>
    <Title to={`/`}>HackerNews</Title>
    <HeaderList>
      {lists.map((listName, index) => (
        <li key={index}>
          <NavLink to={`list/${listName}`}>
            {({ isActive }) => (
              <span className={isActive ? "active" : ""}>{listName}</span>
            )}
          </NavLink>
        </li>
      ))}
    </HeaderList>
  </StyledHeader>
);

export default Header;
