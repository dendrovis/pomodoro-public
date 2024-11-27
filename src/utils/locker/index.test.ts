import { it, describe, expect, beforeEach } from 'vitest';
import { locker, cache } from '../index';
import { OWNER_ID, PRODUCT_ID } from '../../constants';

describe('when set to lock mode', () => {
  it('should show dark mode value', () => {
    locker.setValue(true);
    expect(locker.getValue()).toBe(true);
  });
});

describe('when set to unlock mode', () => {
  it('should show light mode value', () => {
    locker.setValue(false);
    expect(locker.getValue()).toBe(false);
  });
});

describe('when locker is save', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should show in local storage', () => {
    cache.on();
    cache.setProductID(`${PRODUCT_ID}`);
    locker.onSave();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(`${OWNER_ID}_${PRODUCT_ID}_isLocked`)).not.toBeNull();
  });
});
