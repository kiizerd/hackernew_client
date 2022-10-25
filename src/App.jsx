import {
  bestStoriesEndpoint,
  askStoriesEndpoint,
  jobStoriesEndpoint,
} from "./endpoints";
import "./App.css";
import ListTabs from "./components/ListTabs";
import styled from "styled-components";

const PageTitle = styled.h2`
  font-size: 2em;
  margin-top: 0;
`

const App = () => {
  const lists = {
    stories: bestStoriesEndpoint,
    asks: askStoriesEndpoint,
    jobs: jobStoriesEndpoint,
  };
  return (
    <div className="App">
      <PageTitle>HackerNews Client</PageTitle>
      <ListTabs lists={lists} />
    </div>
  );
};

export default App;
