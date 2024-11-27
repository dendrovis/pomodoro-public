import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest';
import timer from '.';

// behaviour

// margin of error +- 10 due to refresh rate is 10ms
// margin of error increases with frequency of start and pause cycles
describe('when timer start', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    timer.stop();
  });
  it('should tick every second', () => {
    timer.start();
    vi.advanceTimersByTime(4999);
    timer.pause();
    expect(timer.getValue().sec).toBe(4);
    timer.start();
    vi.advanceTimersByTime(1);
    timer.pause();
    expect(timer.getValue().sec).toBe(5);
  });

  it('should tick 1 min after 60 seconds past', () => {
    timer.start();
    vi.advanceTimersByTime(60000);
    timer.pause();
    expect(timer.getValue().sec).toBe(0);
    expect(timer.getValue().min).toBe(1);
  });
  it('should tick 2 mins 1 sec after 121 seconds past', () => {
    timer.start();
    vi.advanceTimersByTime(60000 * 2 + 1000);
    timer.pause();
    expect(timer.getValue().sec).toBe(1);
    expect(timer.getValue().min).toBe(2);
  });
});

describe('when timer pause', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    timer.stop();
  });
  it('should stop time and same cycle', () => {
    timer.setCycleCount(4);
    expect(timer.getCycleCount()).toBe(4);
    timer.start();
    vi.advanceTimersByTime(60000);
    timer.pause();
    expect(timer.getValue().min).toBe(1);

    timer.setCycleCount(3);
    expect(timer.getCycleCount()).toBe(3);
    timer.start();
    vi.advanceTimersByTime(59979); // 21ms margin of error
    timer.pause();
    expect(timer.getValue().min).toBe(2);
  });
});

describe('when timer stop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('should reset time and cycle', () => {
    timer.start();
    vi.advanceTimersByTime(3000000); // 50mins
    timer.stop();
    expect(timer.getCurrentCycle()).toBe(1);
    expect(timer.getValue()).toStrictEqual({ sec: 0, min: 0 });
  });
});

describe('when cycle is over', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('should refresh to next cycle if cycle remain', () => {
    timer.setCycleCount(2);
    const defaultCycle = timer.getCurrentCycle();
    const defaultCycleTime = 30;
    timer.start();
    vi.advanceTimersByTime(1000 * 60 * defaultCycleTime);
    timer.pause();
    expect(timer.getCurrentCycle()).toBe(defaultCycle + 1);
  });
  it('should stop and reset cycle and timer when finished', () => {
    timer.setCycleCount(1);
    const defaultCycle = timer.getCurrentCycle();
    const defaultCycleTime = 30;
    timer.start();
    vi.advanceTimersByTime(1000 * 60 * defaultCycleTime);
    timer.pause();
    expect(timer.getCurrentCycle()).toBe(defaultCycle - 1);
  });
});

// atom

describe('when set cycle', () => {
  it('should throw error if more than maximum value', () => {
    expect(() => timer.setCycleCount(49)).toThrowError();
  });
  it('should throw error if less than minimum value', () => {
    expect(() => timer.setCycleCount(0)).toThrowError();
  });
  it('should set the value if within acceptable value', () => {
    expect(timer.setCycleCount(1)).toBeUndefined();
    expect(timer.setCycleCount(48)).toBeUndefined();
  });
});

describe('when set productivity time', () => {
  it('should throw error if more than maximum value', () => {
    expect(() => timer.setProductivityValue(51)).toThrowError();
  });
  it('should throw error if less than minimum value', () => {
    expect(() => timer.setProductivityValue(4)).toThrowError();
  });
  it('should set the value if within acceptable value', () => {
    expect(timer.setProductivityValue(5)).toBeUndefined();
    expect(timer.setProductivityValue(50)).toBeUndefined();
  });
});

describe('when set break time', () => {
  it('should throw error if more than maximum value', () => {
    expect(() => timer.setBreakValue(51)).toThrowError();
  });
  it('should throw error if less than minimum value', () => {
    expect(() => timer.setBreakValue(0)).toThrowError();
  });
  it('should set the value if within acceptable value', () => {
    expect(timer.setBreakValue(1)).toBeUndefined();
    expect(timer.setBreakValue(50)).toBeUndefined();
  });
});

describe('when running onTick', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    timer.stop();
  });
  it('should run when the callback is setOnTick', () => {
    let tick = 0;
    const callback = () => {
      tick += 1;
    };
    timer.setOnTick(callback);
    timer.start();
    vi.advanceTimersByTime(3000);
    timer.pause();
    expect(tick).toBe(3);
  });
});

describe('when running onDone', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    timer.setProductivityValue(25);
    timer.setBreakValue(5);
  });
  afterEach(() => {
    vi.useRealTimers();
    timer.stop();
  });
  it('should run when the callback is setOnDone', () => {
    let called = 0;
    timer.setCycleCount(1);
    const callback = () => {
      called += 1;
    };
    timer.setOnDone(callback);
    timer.start();
    vi.advanceTimersByTime(1000 * 60 * 30); // 30mins in seconds
    timer.pause();
    expect(called).toBe(1);
  });
});

describe('when running onBreak', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    timer.setProductivityValue(25);
    timer.setBreakValue(5);
  });
  afterEach(() => {
    vi.useRealTimers();
    timer.stop();
  });
  it('should run when the callback is setOnBreak', () => {
    let called = 0;
    timer.setCycleCount(1);
    const callback = () => {
      called += 1;
    };
    timer.setOnBreak(callback);
    timer.start();
    vi.advanceTimersByTime(1000 * 60 * 25); // 25mins in seconds
    timer.pause();
    expect(called).toBe(1);
  });
});
