import { beforeEach, beforeAll, expect, describe, it } from 'vitest';
import MotionImage from '.';

beforeEach(() => {
  document.body.innerHTML = '';
});

beforeAll(() => {
  document.body.id = 'app';
});

describe('when given id', () => {
  it('should render if distinct id', () => {
    const testID = 'test';
    MotionImage(testID, '#app');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should throw error if duplicated id exist', () => {
    const testID = 'test-2';
    MotionImage(testID, '#app');
    expect(() => MotionImage(testID, '#app')).toThrowError();
  });
});

describe('when given elementTargetID', () => {
  it('should throw if element does not exist', () => {
    const testID = 'test-3';
    expect(() => MotionImage(testID, 'app')).toThrowError();
  });
  it('should render if element exist', () => {
    const testID = 'test-4';
    MotionImage(testID, '#app');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when setAnimate', () => {
  it('should render idle when set idle as type', () => {
    const testID = 'test-5';
    MotionImage(testID, '#app');
    MotionImage.setAnimate(testID, 'idle');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should render idle when set run as type', () => {
    const testID = 'test-6';
    MotionImage(testID, '#app');
    MotionImage.setAnimate(testID, 'run');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
