import styled from "styled-components";
import { BarLoader } from "react-spinners";
import ItemLink from "./ItemLink";
import ItemDetails from "./ItemDetails";
import useForagedData from "../../hooks/useForagedData";
import useCustomData from "../../hooks/useCustomData";

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
  const { link, time } = useCustomData(data);
  const { title, url } = data;

  return data.title ? (
    <StyledListItem>
      <ListItemNumber i={index} />
      <div>
        <ItemLink link={link} title={title} url={url} />
        <br />
        <ItemDetails data={{ ...data, time }} />
      </div>
    </StyledListItem>
  ) : (
    <BarLoader color="var(--primary-color)" height={1} />
  );
};

export default ListItem;
