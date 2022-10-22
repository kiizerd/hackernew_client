import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ItemList from "./ItemList";

const ListTabs = ({ lists }) => {
  const titleize = (string) => {
    const first = string[0].toUpperCase();
    const rest = string.slice(1).toLowerCase();

    return first.concat(rest);
  };

  return (
    <Tabs>
      <TabList>
        {Object.keys(lists).map((title, index) => (
          <Tab key={index}>{titleize(title)}</Tab>
        ))}
      </TabList>
      {Object.values(lists).map((listEndpoint, index) => (
        <TabPanel key={index}>
          <ItemList endpoint={listEndpoint} perPage={30}/>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default ListTabs;
