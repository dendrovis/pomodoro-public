import type { Inverse, LastArrayElement } from './type';

export const inverse: Inverse = (value: boolean) => !value;

export const lastArrayElement: LastArrayElement = (value, splitter) => value?.split(splitter).pop();

// - not sanitized svg
export const isSVGRawTag = (value: string) => value.match(/^<svg[^>].*>[\s\S]*<\/svg>\n$/) !== null;

export const isWithinTime = (value: number) => value <= 60 && value >= 0;

export const isZeroOrNegative = (value: number) => value <= 0;
