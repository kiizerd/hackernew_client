const base = "https://hacker-news.firebaseio.com/v0/";
const suffix = ".json?print=pretty";

const logRequests = import.meta.env.VITE_LOG_API_REQUESTS === 'true';

const maxItemEndpoint = base + "maxitem" + suffix;
const newStoriesEndpoint = base + "newstories" + suffix;
const topStoriesEndpoint = base + "topstories" + suffix;
const bestStoriesEndpoint = base + "beststories" + suffix;
const jobStoriesEndpoint = base + "jobstories" + suffix;
const askStoriesEndpoint = base + "askstories" + suffix;
const showStoriesEndpoint = base + "showstories" + suffix;
const itemEndpoint = (itemNum) => base + `item/${itemNum}` + suffix;
const userEndpoint = (username) => base + `user/${username}` + suffix;

const itemEndpoints = {
  maxItem: maxItemEndpoint,
  item: itemEndpoint,
  user: userEndpoint,
};

const collectionEndpoints = {
  new: newStoriesEndpoint,
  top: topStoriesEndpoint,
  best: bestStoriesEndpoint,
  ask: askStoriesEndpoint,
  show: showStoriesEndpoint,
  jobs: jobStoriesEndpoint,
};

const endpoints = {
  ...itemEndpoints,
  ...collectionEndpoints,
};

const getRawCollection = async (endpointKey) => {
  const endpoint = endpoints[endpointKey];

  return fetch(endpoint);
};

const getCollection = async (endpointKey) => {
  const endpoint = endpoints[endpointKey];
  const response = await fetch(endpoint);
  const collectionIds = await response.json();
  logRequests && console.log("API - getting collection", endpointKey);

  return collectionIds;
};

const getItem = async (itemId) => {
  const endpoint = itemEndpoint(itemId);
  const response = await fetch(endpoint);
  const data = await response.json();
  logRequests && console.log("API - getting item", itemId, data);

  return data;
};

export {
  getItem,
  getCollection,
  getRawCollection,
  endpoints,
  collectionEndpoints,
  itemEndpoints,
  itemEndpoint,
  userEndpoint,
};
