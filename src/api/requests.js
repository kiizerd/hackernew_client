const base = "https://hacker-news.firebaseio.com/v0/";
const suffix = ".json?print=pretty";

export const maxItemEndpoint = base + "maxitem" + suffix;
export const newStoriesEndpoint = base + "newstories" + suffix;
export const topStoriesEndpoint = base + "topstories" + suffix;
export const bestStoriesEndpoint = base + "beststories" + suffix;
export const jobStoriesEndpoint = base + "jobstories" + suffix;
export const askStoriesEndpoint = base + "askstories" + suffix;
export const showStoriesEndpoint = base + "showstories" + suffix;
export const itemEndpoint = (itemNum) => base + `item/${itemNum}` + suffix;
export const userEndpoint = (username) => base + `user/${username}` + suffix;

export const itemEndpoints = {
  maxItem: maxItemEndpoint,
  item: itemEndpoint,
  user: userEndpoint,
};

export const collectionEndpoints = {
  new: newStoriesEndpoint,
  top: topStoriesEndpoint,
  best: bestStoriesEndpoint,
  ask: askStoriesEndpoint,
  show: showStoriesEndpoint,
  job: jobStoriesEndpoint,
};

export const endpoints = {
  ...itemEndpoints,
  ...collectionEndpoints,
};

export async function getRawCollection(endpointKey) {
  const endpoint = endpoints[endpointKey];

  return fetch(endpoint);
}

export async function getCollection(endpointKey) {
  const endpoint = endpoints[endpointKey];
  const response = await fetch(endpoint);
  const collectionIds = await response.json();
  console.log("getting collection", endpointKey);

  return collectionIds;
}

export async function getItem(itemId) {
  const endpoint = itemEndpoint(itemId);
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log("getting item", itemId, data);

  return data;
}
