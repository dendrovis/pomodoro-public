export type Cache = {
  on: On;
  off: Off;
  add: Add;
  remove: Remove;
  isCached: IsCached;
  setProductID: SetProductID;
  getCache: GetCache;
};

export type On = () => void;
export type Off = () => void;
export type Add = (propertyID: string, value: string) => string;
export type Remove = (propertyID: string) => void;

export type States = { isCached: boolean; productID?: string };
export type SetCached = (isCached: States['isCached']) => void;
export type SetProductID = (isCached: States['productID']) => void;
export type IsCached = () => boolean;
export type GetCache = () => string[];

export type InvalidID = (id?: string) => boolean;
export type InvalidValue = (id?: string) => boolean;

export type FindLocalStorageItems = (pattern: string) => Array<string>;
export type RemoveLocalStorageSelectedItems = (selectedItems: Array<string>) => void;
