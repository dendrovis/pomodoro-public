import { it, expect } from 'vitest';
import { inverse, lastArrayElement, isSVGRawTag, isWithinTime, isZeroOrNegative } from '.';

it('should inverse the value correctly', () => {
  expect(inverse(true)).toBe(false);
});

it('should retrieve last element of the array correctly', () => {
  expect(lastArrayElement('abc/b', '/')).toBe('b');
  expect(lastArrayElement('abc/ b', '/')).toBe(' b');
  expect(lastArrayElement('', '/')).toBe('');
  expect(lastArrayElement('', '')).toBeUndefined();
  expect(lastArrayElement('abcd', '')).toBe('d'); //no splitter will select last character as element
});

it('should matched a svg raw tag correctly', () => {
  expect(isSVGRawTag(`<svg attribute="a"><path></path></svg>\n`)).toBe(true);
  expect(isSVGRawTag(`<svg ></svg>\n`)).toBe(true);
  expect(isSVGRawTag(`<svg></svg>`)).toBe(false); // must have attributes
  expect(isSVGRawTag(`<svg attribute="a"><path></path></svg>`)).toBe(false);
});

it('should response true if within time or else false', () => {
  expect(isWithinTime(-1)).toBe(false);
  expect(isWithinTime(61)).toBe(false);
  expect(isWithinTime(0)).toBe(true);
  expect(isWithinTime(60)).toBe(true);
});

it('should response true if zero or negative value or else false', () => {
  expect(isZeroOrNegative(0)).toBe(true);
  expect(isZeroOrNegative(Number.NEGATIVE_INFINITY)).toBe(true);
  expect(isZeroOrNegative(1)).toBe(false);
});
