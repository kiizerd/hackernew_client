import styled from "styled-components";
import { BarLoader } from "react-spinners";
import ItemLink from "./ItemLink";
import ItemDetails from "./ItemDetails";
import useForagedData from "../../hooks/useForagedData";

const StyledListItem = styled.li`
  display: flex;
  align-items: start;
  gap: 7px;
  margin: 4px 7px;
  padding: 0 11px;
  background-color: var(--primary-color);
  }
`;

const ItemNum = styled.span`
  font-size: 0.75rem;
  margin-top: 4px;
`;

const ListItemNumber = ({ i }) => (i || i === 0) && <ItemNum>{i + 1}.</ItemNum>;
const ListItem = ({ id, index }) => {
  const data = useForagedData(id);
  const { link, time, title, url } = data;

  if (!data.title)
    return (
      <BarLoader
        color="var(--primary-color)"
        height={2}
        cssOverride={{ margin: "7px" }}
      />
    );

  return (
    <StyledListItem>
      <ListItemNumber i={index} />
      <div>
        <ItemLink link={link} title={title} url={url} />
        <br />
        <ItemDetails data={{ ...data, time }} />
      </div>
    </StyledListItem>
  );
};

export default ListItem;
