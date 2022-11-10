import styled from "styled-components";
import ItemLink from "./ItemLink";
import ItemDetails from "./ItemDetails";
import useForagedData from "../../hooks/useForagedData";
import useCustomData from "../../hooks/useCustomData";

const PageHeader = styled.header`
  margin: 11px 0 0;
  padding: 4px 7px;
  font-size: large;
  background-color: var(--primary-color);
  border-left: 3px solid var(--primary-accent-color);
`;

export default ({ id }) => {
  const data = useForagedData(id);
  const { link, time } = useCustomData(data);
  const { descendants, title, url } = data;

  return (
    <PageHeader>
      <ItemLink link={link} title={title} url={url} />
      <ItemDetails data={{ ...data, time }} />
    </PageHeader>
  );
};
