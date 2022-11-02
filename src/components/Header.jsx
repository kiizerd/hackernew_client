import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 4px;
  display: flex;
  gap: 12px;
  background-color: #363636;
`;

const PageTitle = styled.div`
  font-size: 1.2rem;
  margin-right: 8px;
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
`;

const Header = ({ tabLists }) => {
  return (
    <StyledHeader>
      <PageTitle>HackerNews</PageTitle>
      <HeaderList>
        <li>best</li>
        <li>new</li>
        <li>comments</li>
        <li>show</li>
        <li>ask</li>
        <li>jobs</li>
        <li>read</li>
      </HeaderList>
    </StyledHeader>
  );
};

export default Header;
