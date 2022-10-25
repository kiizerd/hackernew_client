export const maxItemIdEndpoint   = "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty";
export const newStoriesEndpoint  = "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
export const topStoriesEndpoint  = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
export const bestStoriesEndpoint = "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"

export const jobStoriesEndpoint  = "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty"
export const askStoriesEndpoint  = "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
export const itemEndpoint = (itemNum) => {
  return `https://hacker-news.firebaseio.com/v0/item/${itemNum}.json?print=pretty`;
}
export const userEndpoint = (username) => {
  return `https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`;
}
