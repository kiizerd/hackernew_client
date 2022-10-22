import {
  bestStoriesEndpoint,
  askStoriesEndpoint,
  jobStoriesEndpoint,
} from "./endpoints";
import "./App.css";
import ListTabs from "./components/ListTabs";

const App = () => {
  const lists = {
    stories: bestStoriesEndpoint,
    asks: askStoriesEndpoint,
    jobs: jobStoriesEndpoint,
  };
  return (
    <div className="App">
      <h1>HackerNews Client</h1>
      <ListTabs lists={lists} />
    </div>
  );
};

export default App;
