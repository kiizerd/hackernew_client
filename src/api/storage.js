import localforage from "localforage";
import {
  getCollection as getRemoteCollection,
  getItem as getRemoteItem,
} from "./requests";

const logRequests = import.meta.env.VITE_LOG_STORAGE_REQUESTS === 'true';

// Requests made from here will check
// if the item exists locally before attempting to fetch it.
// If a fetch is needed and successful, save response.
// 
// TODO: If a certain time has elapsed since the timestamp,
// make another fetch request and refresh the saved data
const forageItem = async (itemId) => {
  const idString = `${itemId}`;
  let item = await getLocalItem(idString);
  if (!Boolean(item)) {
    item = await getRemoteItem(idString);
    setLocalItem(idString, item);
  }
  return item;
};

const forageCollection = async (endpointKey) => {
  const endpointKeyString = `${endpointKey}`;
  let collection = await getLocalCollection(endpointKeyString);
  if (!Boolean(collection)) {
    collection = getRemoteCollection(endpointKeyString);
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
      logRequests && console.log("getting stored item", item);
    })
    .catch((err) => console.error(err));

  return item;
};

const setLocalItem = (id, item) => {
  const timeStampedItem = addTimeStamp(item);
  localforage
    .setItem(id, timeStampedItem)
    .then((value) => logRequests && console.log(`item ${id} set`, value))
    .catch((err) => console.error(err));
};

const getLocalCollection = async (collectionKey) => {
  let collection = null;
  await localforage
    .getItem(collectionKey)
    .then((collectionData) => {
      collection = collectionData;
      logRequests && console.log("getting stored collection", collection);
    })
    .catch((err) => console.error(err));

  return collection;
};

const setLocalCollection = (key, collection) => {
  const timeStampedCollection = addTimeStamp(collection);
  localforage
    .setItem(key, timeStampedCollection)
    .then((value) => logRequests && console.log(`collection ${key} set`, value))
    .catch((err) => console.error(err));
};

const addTimeStamp = (item) => {
  const apiTimestamp = new Date().getTime();
  return { apiTimestamp, ...item };
};

const clearLocalForage = () => {
  localforage
    .clear()
    .then((_) => logRequests && console.log("localforage cleared"))
    .catch((err) => console.error(err));
};

window.clearLocalForage = clearLocalForage;

export { forageCollection, forageItem, clearLocalForage };
