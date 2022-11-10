import localforage from "localforage";
import {
  getCollection as getRemoteCollection,
  getItem as getRemoteItem,
} from "./requests";

const logRequests = import.meta.env.VITE_LOG_STORAGE_REQUESTS === "true";

// Requests made from here will check
// if the item exists locally before attempting to fetch it.
// If a fetch is needed and successful, save response.
//
// TODO: If a certain time has elapsed since the timestamp,
// make another fetch request and refresh the saved data
const forageItem = async (itemId) => {
  const idString = `${itemId}`;
  let item = await getLocalItem(idString);
  const localItemIsValid =
    Boolean(item) && timestampWithin(item.apiTimestamp, 45);
  if (!localItemIsValid) {
    item = await getRemoteItem(idString);
    setLocalItem(idString, item);
  }
  return item;
};

const forageCollection = async (endpointKey) => {
  const endpointKeyString = `${endpointKey}`;
  let collection = await getLocalCollection(endpointKeyString);
  const localCollectionIsValid =
    Boolean(collection) && timestampWithin(collection.apiTimestamp, 120);
  if (!localCollectionIsValid) {
    collection = await getRemoteCollection(endpointKeyString);
    setLocalCollection(endpointKeyString, collection);
  }

  return collection;
};

const getLocalItem = async (itemId) => {
  let item = null;
  await localforage
    .getItem(itemId)
    .then((itemData) => {
      item = itemData;
      logRequests && console.log("Storage - getting item", itemId);
    })
    .catch((err) => console.error(err));

  return item;
};

const setLocalItem = (id, item) => {
  const timestampedItem = addTimestamp(item);
  localforage
    .setItem(id, timestampedItem)
    .then((_) => logRequests && console.log(`Storage - ${id} set`))
    .catch((err) => console.error(err));
};

const getLocalCollection = async (collectionKey) => {
  let collection = null;
  await localforage
    .getItem(collectionKey)
    .then((collectionData) => {
      collection = collectionData;
      logRequests && console.log("Storage - getting collection", collectionKey);
    })
    .catch((err) => console.error(err));

  return collection;
};

const setLocalCollection = (key, collection) => {
  // const timeStampedCollection = addTimestamp({ collection });
  collection.apiTimestamp = new Date().getTime();
  localforage
    .setItem(key, collection)
    .then((_) => logRequests && console.log(`Storage - ${key} list set`))
    .catch((err) => console.error(err));
};

const addTimestamp = (item) => {
  const apiTimestamp = new Date().getTime();
  return { apiTimestamp, ...item };
};

const timestampWithin = (timestamp, seconds) => {
  Math.abs(timestamp - new Date()) / 1000 < seconds;
};

const clearLocalForage = () => {
  localforage
    .clear()
    .then((_) => logRequests && console.log("localforage cleared"))
    .catch((err) => console.error(err));
};

window.clearLocalForage = clearLocalForage;
window.forageItem = forageItem;
window.forageCollection = forageCollection;

export { forageCollection, forageItem, clearLocalForage };
