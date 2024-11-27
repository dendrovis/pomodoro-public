import { it, describe, expect, beforeEach } from 'vitest';
import { theme, cache } from '../index';
import { OWNER_ID, PRODUCT_ID } from '../../constants';

describe('when set to dark mode', () => {
  it('should show dark mode value', () => {
    theme.setValue('dark');
    expect(theme.getValue()).toBe('dark');
  });
});

describe('when set to light mode', () => {
  it('should show light mode value', () => {
    theme.setValue('light');
    expect(theme.getValue()).toBe('light');
  });
});

describe('when theme is save', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should show in local storage', () => {
    cache.on();
    cache.setProductID(`${PRODUCT_ID}`);
    theme.onSave();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(`${OWNER_ID}_${PRODUCT_ID}_themeType`)).not.toBeNull();
  });
});
