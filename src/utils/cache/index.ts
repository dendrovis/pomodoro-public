import { OWNER_ID } from '../../constants';
import type {
  Off,
  Cache,
  On,
  Add,
  Remove,
  States,
  SetCached,
  SetProductID,
  InvalidID,
  InvalidValue,
  IsCached,
  FindLocalStorageItems,
  RemoveLocalStorageSelectedItems,
  GetCache,
} from './type';

const states: States = { isCached: false, productID: undefined };

const getPattern = () => `^${OWNER_ID}_${states.productID}.*$`;
const setCached: SetCached = (isCached) => (states.isCached = isCached);

const isCached: IsCached = () => states.isCached;

const setProductID: SetProductID = (productID) => {
  if (invalidID(productID)) throw Error('Not valid product ID');
  states.productID = productID;
  return states.productID;
};

const invalidID: InvalidID = (id) => id === undefined || id.match(/^.{8,}$/) === null;
const invalidValue: InvalidValue = (value) => value === undefined || value === null || value === '';

const on: On = () => setCached(true);
const off: Off = () => {
  const selectedItems = findLocalStorageItems(getPattern());
  removeLocalStorageSelectedItems(selectedItems);
  setCached(false);
};

const add: Add = (propertyID, value) => {
  if (invalidID(propertyID)) throw Error('Not valid property ID');
  if (invalidValue(value)) throw Error('Not valid value');
  const key = `${OWNER_ID}_${states.productID}_${propertyID}`;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    throw Error(`${error}`);
  }
  return `added ${value} value into ${key} key`;
};

const remove: Remove = (propertyID) => {
  if (localStorage.getItem(propertyID) === null) return false;
  localStorage.removeItem(propertyID);
  return true;
};

const findLocalStorageItems: FindLocalStorageItems = (pattern) => {
  const cacheKeys = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (key !== null && key?.match(pattern) !== null) cacheKeys.push(key);
  }
  return cacheKeys;
};

const removeLocalStorageSelectedItems: RemoveLocalStorageSelectedItems = (selectedItems) => {
  selectedItems.forEach((key) => {
    localStorage.removeItem(key);
  });
};

const getCache: GetCache = () => findLocalStorageItems(getPattern());

const cache: Cache = { on, off, add, remove, isCached, setProductID, getCache };

export default cache;
