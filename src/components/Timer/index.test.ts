import { describe, expect, it, vi } from 'vitest';
import Timer from '.';

// currently most of the test here base on initial to intermediate behaviours before passing into chartjs apis
// TODO: to test end render is snapshot as images after chartjs rendered
describe('when given timer value in seconds', () => {
  it('should render with the given the right value', () => {
    expect(
      Timer({
        id: 'test',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toBeDefined();

    expect(
      Timer({
        id: 'test-2',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 60,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toBeDefined();
  });
  it('should throw error if value outside of boundary (0 to 60)', () => {
    expect(() =>
      Timer({
        id: 'test-3',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: -1,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toThrowError();

    expect(() =>
      Timer({
        id: 'test-4',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 61,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toThrowError();
  });
});

describe('when given timer value in minutes', () => {
  it('should render with the given the right value', () => {
    expect(
      Timer({
        id: 'test-5',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toBeDefined();

    expect(
      Timer({
        id: 'test-6',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 60,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toBeDefined();
  });
  it('should throw error if value outside of boundary (0 to 60)', () => {
    expect(() =>
      Timer({
        id: 'test-7',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: -1,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toThrowError();

    expect(() =>
      Timer({
        id: 'test-8',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 61,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toThrowError();
  });
});

describe('when given total cycle', () => {
  it('should render the number of cycle in the inner circle', () => {
    expect(
      Timer({
        id: 'test-9',
        totalCycle: 1,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toBeDefined();

    expect(
      Timer({
        id: 'test-10',
        totalCycle: 48,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toBeDefined();
  });
  it('should throw error is 0 or negative value of cycles', () => {
    expect(() =>
      Timer({
        id: 'test-11',
        totalCycle: 0,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toThrowError();

    expect(() =>
      Timer({
        id: 'test-11',
        totalCycle: -1,
        currentCycle: 1,
        isBreak: false,
        minutes: 0,
        seconds: 0,
        onPlay: () => true,
        onPause: () => true,
        onStop: () => {},
      })
    ).toThrowError();
  });
});

describe('when clicked stop', () => {
  it('should trigger stop callbacks', () => {
    let called = false;
    const callback = () => {
      called = true;
    };

    //suppress side effect due to DOMContentLoaded not isolated called - chart error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    document.body.innerHTML = Timer({
      id: 'test-12',
      totalCycle: 1,
      currentCycle: 1,
      isBreak: false,
      minutes: 0,
      seconds: 0,
      onPlay: () => true,
      onPause: () => true,
      onStop: callback,
    });
    const componentID = '#icon-stop-test-12';
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const element = document.querySelector(componentID);
    element && element.dispatchEvent(new Event('click'));
    expect(called).toBe(true);
  });
});

describe('when clicked play', () => {
  it('should trigger play callbacks', () => {
    let called = false;
    const callback = () => {
      called = true;
      return true;
    };

    //suppress side effect due to DOMContentLoaded not isolated called - chart error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    document.body.innerHTML = Timer({
      id: 'test-13',
      totalCycle: 1,
      currentCycle: 1,
      isBreak: false,
      minutes: 0,
      seconds: 0,
      onPlay: callback,
      onPause: () => true,
      onStop: () => {},
    });

    const componentID = '#icon-play-pause-test-13';
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const element = document.querySelector(componentID);
    element && element.dispatchEvent(new Event('click'));
    expect(called).toBe(true);
  });
});

// must click play then can pause, since initial load always on play first, thus double click
describe('when clicked pause', () => {
  it('should trigger pause callbacks', () => {
    let called = false;
    const callback = () => {
      called = true;
      return true;
    };

    //suppress side effect due to DOMContentLoaded not isolated called - chart error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    document.body.innerHTML = Timer({
      id: 'test-14',
      totalCycle: 1,
      currentCycle: 1,
      isBreak: false,
      minutes: 0,
      seconds: 0,
      onPlay: () => true,
      onPause: callback,
      onStop: () => {},
    });

    const componentID = '#icon-play-pause-test-14';
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const element = document.querySelector(componentID);
    if (element) {
      element.dispatchEvent(new Event('click'));
      element.dispatchEvent(new Event('click'));
    }
    expect(called).toBe(true);
  });
});

describe('when set theme', () => {
  it('should show dark theme when set dark', () => {
    const element = Timer({
      id: 'test-15',
      totalCycle: 1,
      currentCycle: 1,
      isBreak: false,
      isDark: true,
      minutes: 0,
      seconds: 0,
      onPlay: () => true,
      onPause: () => true,
      onStop: () => {},
    });
    expect(element).toMatchSnapshot();

    document.body.innerHTML = Timer({
      id: 'test-16',
      totalCycle: 1,
      currentCycle: 1,
      isBreak: false,
      isDark: false,
      minutes: 0,
      seconds: 0,
      onPlay: () => true,
      onPause: () => true,
      onStop: () => {},
    });
    Timer.setTheme('test-16', 'dark');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should show light theme when set light', () => {
    const element = Timer({
      id: 'test-17',
      totalCycle: 1,
      currentCycle: 1,
      isBreak: false,
      isDark: false,
      minutes: 0,
      seconds: 0,
      onPlay: () => true,
      onPause: () => true,
      onStop: () => {},
    });
    expect(element).toMatchSnapshot();

    document.body.innerHTML = Timer({
      id: 'test-18',
      totalCycle: 1,
      currentCycle: 1,
      isBreak: false,
      isDark: true,
      minutes: 0,
      seconds: 0,
      onPlay: () => true,
      onPause: () => true,
      onStop: () => {},
    });
    Timer.setTheme('test-18', 'light');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
