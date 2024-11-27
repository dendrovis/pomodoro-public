import { describe, it, beforeEach, expect } from 'vitest';
import Base from '.';
import { ICON_LOCK, IMG_SUN } from '../../../assets';

beforeEach(() => {
  document.body.innerHTML = '';
  document.body.id = 'app';
});

describe('when given id', () => {
  it('should throw error if same id is used', () => {
    Base({
      id: 'test',
      icon: `<svg id="test"></svg>\n`,
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
    });
    expect(() =>
      Base({
        id: 'test',
        icon: `<svg id="test"></svg>\n`,
        onClick: () => {},
        theme: 'light',
        elementTargetID: '#app',
      })
    ).toThrowError();
  });
});

describe('when user click', () => {
  it('should invoke onClick callback', () => {
    let called = false;
    Base({
      id: 'test-2',
      icon: `<svg id="test"></svg>\n`,
      onClick: () => {
        called = true;
      },
      theme: 'light',
      elementTargetID: '#app',
    });
    const element = document.querySelector('#icon-base-test-2') as HTMLDivElement;
    element.click();
    expect(called).toBe(true);
  });
});

describe('when given icon', () => {
  it('should throw if not svg raw format', () => {
    expect(() =>
      Base({
        id: 'test-3',
        icon: IMG_SUN,
        onClick: () => {},
        theme: 'light',
        elementTargetID: '#app',
      })
    ).toThrowError();
  });
  it('should render svg raw format', () => {
    Base({
      id: 'test-4',
      icon: ICON_LOCK,
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when set theme', () => {
  it('should render the right theme', () => {
    Base({
      id: 'test-5',
      icon: ICON_LOCK,
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
    });
    expect(document.body.innerHTML).toMatchSnapshot();
    Base({
      id: 'test-6',
      icon: ICON_LOCK,
      onClick: () => {},
      theme: 'dark',
      elementTargetID: '#app',
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when set elementTargetID', () => {
  it('should throw error if element id does not exist', () => {
    expect(() =>
      Base({
        id: 'test-7',
        icon: ICON_LOCK,
        onClick: () => {},
        theme: 'light',
        elementTargetID: 'app',
      })
    ).toThrowError();
  });
  it('should render if element id exist', () => {
    Base({
      id: 'test-8',
      icon: ICON_LOCK,
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when icon is set close-able', () => {
  it('should render closed icon when clicked', () => {
    Base({
      id: 'test-9',
      icon: `<svg id="test"></svg>\n`,
      onClick: () => {},
      theme: 'light',
      elementTargetID: '#app',
    });
    Base.setClosed('test-9', true);
    const element = document.querySelector('#icon-base-test-9') as HTMLDivElement;
    element.click();
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('should render origin icon when double clicked', () => {
    Base({
      id: 'test-10',
      icon: `<svg id="test"></svg>\n`,
      onClick: () => {},
      theme: 'dark',
      elementTargetID: '#app',
    });
    Base.setClosed('test-9', false);
    const element = document.querySelector('#icon-base-test-10') as HTMLDivElement;
    element.click();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
