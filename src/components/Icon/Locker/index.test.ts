import { describe, it, beforeEach, beforeAll, expect } from 'vitest';
import Locker from '.';

beforeEach(() => {
  document.body.innerHTML = '';
});

beforeAll(() => {
  document.body.id = 'app';
});

describe('when given id', () => {
  it('should throw error if same id is used', () => {
    Locker({
      id: 'test',
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
      isLocked: false,
    });
    expect(() =>
      Locker({
        id: 'test',
        onClick: () => {},
        theme: 'light',
        elementTargetID: '#app',
        isLocked: false,
      })
    ).toThrowError();
  });
});

describe('when user click', () => {
  it('should invoke onClick callback', () => {
    let called = false;
    Locker({
      id: 'test-2',
      onClick: () => {
        called = true;
      },
      theme: 'light',
      elementTargetID: '#app',
      isLocked: false,
    });
    const element = document.querySelector('#icon-locker-test-2') as HTMLDivElement;
    element.click();
    expect(called).toBe(true);
  });
});

describe('when set theme', () => {
  it('should render the right theme', () => {
    Locker({
      id: 'test-3',
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
      isLocked: false,
    });
    expect(document.body.innerHTML).toMatchSnapshot();
    Locker({
      id: 'test-4',
      onClick: () => {},
      theme: 'dark',
      elementTargetID: '#app',
      isLocked: false,
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when set elementTargetID', () => {
  it('should throw error if element id does not exist', () => {
    expect(() =>
      Locker({
        id: 'test-5',
        onClick: () => {},
        theme: 'light',
        elementTargetID: 'app',
        isLocked: false,
      })
    ).toThrowError();
  });
  it('should render if element id exist', () => {
    Locker({
      id: 'test-6',
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
      isLocked: false,
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when set isLocked', () => {
  it('should render locked if true', () => {
    Locker({
      id: 'test-7',
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
      isLocked: true,
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('should render locked if false', () => {
    Locker({
      id: 'test-8',
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
      isLocked: false,
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
