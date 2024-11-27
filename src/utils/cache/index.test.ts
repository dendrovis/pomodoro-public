import { it, describe, expect, afterEach, beforeEach } from 'vitest';
import { cache, locker, alarmer, theme } from '../index';
import { OWNER_ID, PRODUCT_ID } from '../../constants';

// behaviour
describe('when cache is change from off to on', () => {
  beforeEach(() => {
    localStorage.clear();
    cache.off();
    cache.on();
    cache.setProductID(PRODUCT_ID);
  });
  it('should saved notifer value', () => {
    alarmer.setValue(true);
    alarmer.onSave();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(`${OWNER_ID}_${PRODUCT_ID}_isAlarmed`)).toBe('true');
  });
  it('should saved theme value', () => {
    theme.setValue('light');
    theme.onSave();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(`${OWNER_ID}_${PRODUCT_ID}_themeType`)).toBe('light');
  });
  it('should saved locker value', () => {
    locker.setValue(true);
    locker.onSave();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(`${OWNER_ID}_${PRODUCT_ID}_isLocked`)).toBe('true');
  });
});

describe('when cache is change from on to off', () => {
  beforeEach(() => {
    localStorage.clear();
    cache.on();
    cache.setProductID(PRODUCT_ID);
  });
  it('should unsaved alarmer value', () => {
    alarmer.onSave();
    expect(localStorage.length).toBe(1);
    cache.off();
    expect(localStorage.length).toBe(0);
  });
  it('should unsaved theme value', () => {
    theme.onSave();
    expect(localStorage.length).toBe(1);
    cache.off();
    expect(localStorage.length).toBe(0);
  });
  it('should unsaved locker value', () => {
    locker.onSave();
    expect(localStorage.length).toBe(1);
    cache.off();
    expect(localStorage.length).toBe(0);
  });
});

// atom
describe('when cache is added', () => {
  beforeEach(() => {
    cache.setProductID('123456789');
    localStorage.clear();
  });
  it('should throw error when propertyID is empty string', () => {
    expect(() => cache.add('', '12345678')).toThrowError();
  });
  it('should throw error when propertyID is less than 8 characters', () => {
    expect(() => cache.add('1234567', '12345678')).toThrowError();
  });
  it('should throw error when value is empty string', () => {
    expect(() => cache.add('12345678', '')).toThrowError();
  });
  it('should set propertyID when propertyID is equal or more than 8 characters and value is not empty string', () => {
    expect(cache.add('12345678', '12345678')).toBe(
      'added 12345678 value into dendrovis_123456789_12345678 key'
    );
  });
  it('should return success message when successfully added', () => {
    cache.add('12345678', '12345678');
    expect(localStorage.getItem(`${OWNER_ID}_123456789_12345678`)).toBe('12345678');
  });
});

describe('when cache is removed', () => {
  afterEach(() => {
    localStorage.clear();
  });
  it('should removed from local storage when exist', () => {
    localStorage.setItem('12345678_12345678', '9');
    expect(cache.remove('12345678_12345678')).true;
  });
  it('should not removed from local storage when not exist', () => {
    expect(cache.remove('does_not_exist')).false;
  });
});

describe('when cache is set to on mode', () => {
  it('should set to on', () => {
    cache.on();
    expect(cache.isCached()).toBe(true);
  });
});

describe('when cache is set to off mode', () => {
  it('should set to off', () => {
    cache.off();
    expect(cache.isCached()).toBe(false);
  });
});

describe('when set productID for cache', () => {
  it('should throw an error when productID is undefined', () => {
    expect(() => cache.setProductID(undefined)).toThrowError();
  });
  it('should throw an error when productID is empty string', () => {
    expect(() => cache.setProductID('')).toThrowError();
  });
  it('should throw an error when productID is less than 8 characters', () => {
    expect(() => cache.setProductID('1234567')).toThrowError();
  });
  it('should received correct productID state when equal or more than 8 character', () => {
    expect(cache.setProductID('12345678'));
  });
});

describe('when remove localstorage', () => {
  beforeEach(() => {
    localStorage.clear();
    cache.setProductID(PRODUCT_ID);
    localStorage.setItem(`${OWNER_ID}_${PRODUCT_ID}_PROPERTYID_A`, '1');
    localStorage.setItem(`${OWNER_ID}_${PRODUCT_ID}_PROPERTYID_B`, '2');
    localStorage.setItem(`${OWNER_ID}_${PRODUCT_ID}_PROPERTYID_C`, '3');
    localStorage.setItem(`OTHER_PROPERTY`, '4');
  });
  it('should deduct the total count of keys base on the number of keys given', () => {
    expect(localStorage.length).toBe(4);
    cache.off();
    expect(localStorage.length).toBe(1);
  });
});

describe('when trying to get cache', () => {
  it('should not received array of keys if not exist', () => {
    expect(cache.getCache().length).toBe(0);
  });
  it('should received array of keys if exist', () => {
    cache.setProductID('123456789');
    cache.add('12345678', '123');
    expect(cache.getCache().length).toBe(1);
  });
});
