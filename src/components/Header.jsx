import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 4px;
  display: flex;
  gap: 12px;
  background-color: #363636;
`;

const PageTitle = styled(Link)`
  color: unset;
  font-size: 1.2rem;
  margin-right: 8px;

  &:hover {
    color: unset;
  }
`;

const HeaderList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;

  // Add a separator after every child but last
  & > li {
    & > a {
      color: inherit;

      &:hover {
        text-decoration: underline;
      }
    }
    &:after {
      margin: 5px;
      content: "|";
    }

    &:last-child {
      &:after {
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
    <PageTitle to={`list/top`}>HackerNews</PageTitle>
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
