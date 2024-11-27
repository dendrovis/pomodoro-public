import { CACHE_ID } from '../../constants';
import cache from '../cache';
import {
  GetCycleCount,
  GetValue,
  Pause,
  SetBreakValue,
  SetProductivityValue,
  Start,
  States,
  Stop,
  Tick,
  Timer,
  ModeCycle,
  GetMode,
  TimeoutID,
  GetCurrentCycle,
  SetModeValue,
  OnTick,
  SetOnTick,
  GetProductivityValue,
  GetBreakValue,
  SetCycleCount,
  OnDone,
  SetOnDone,
  OnSave,
  SetOnBreak,
  OnBreak,
} from './type';

const states: States = {
  sec: 0,
  min: 0,
  cycle: 1, // minimum 1
  totalCycle: 3,
  productivityValue: 25, // per mins
  breakValue: 5, // per mins
  isRunning: false,
  mode: 'productivity',
};

// order matter
const modeCycle: ModeCycle = ['productivity', 'break'];

let count = 0;
const MAXIMUM_CYCLE = 48;
const MINIMUM_CYCLE = 1;

const tick: Tick = () => {
  //lower refresh rate means better accuracy when pause
  const refresherID: TimeoutID = setTimeout(tick, 10);
  if (!states.isRunning) {
    refresherID && clearTimeout(refresherID);
    return;
  }

  if (count >= 100) {
    count = 0;
    const currentModeValue = states[`${states.mode}Value`] - 1; // -1 because 24:59 is end, not 25:59
    const isLastMode = modeCycle[modeCycle.length - 1] === states.mode;
    const currentModeIndex = modeCycle.indexOf(states.mode);
    if (states.sec < 59) {
      states.sec += 1;
    } else if (states.sec == 59 && states.min < currentModeValue) {
      states.min += 1;
      states.sec = 0;
    } else if (states.sec == 59 && states.min == currentModeValue && !isLastMode) {
      states.min = 0;
      states.sec = 0;
      states.mode = modeCycle[currentModeIndex + 1];
    } else if (
      states.sec == 59 &&
      states.min == currentModeValue &&
      isLastMode &&
      states.cycle < states.totalCycle
    ) {
      states.min = 0;
      states.sec = 0;
      states.mode = modeCycle[0];
      states.cycle += 1;
    } else {
      onDone && onDone();
      states.isRunning = false;
      reset();
    }
    // onBreak
    if (states.mode === 'break' && states.min === 0 && states.sec === 0) {
      onBreak && onBreak();
    }
    onTick && onTick({ min: states.min, sec: states.sec }, states.mode, states.cycle);
  }
  count++;
};

const reset = () => {
  states.sec = 0;
  states.min = 0;
  states.cycle = 1;
  states.mode = modeCycle[0];
};

const getValue: GetValue = () => ({ sec: states.sec, min: states.min });

const getCycleCount: GetCycleCount = () => states.totalCycle;

const getCurrentCycle: GetCurrentCycle = () => states.cycle;

const getMode: GetMode = () => states.mode;

const setProductivityValue: SetProductivityValue = (value) => {
  const MINIMUM = 5;
  const MAXIMUM = 50;
  if (value >= MINIMUM && value <= MAXIMUM) states.productivityValue = value;
  else throw Error('Invalid value');
};

const getProductivityValue: GetProductivityValue = () => states.productivityValue;

const setBreakValue: SetBreakValue = (value) => {
  const MINIMUM = 1;
  const MAXIMUM = 50;
  if (value >= MINIMUM && value <= MAXIMUM) states.breakValue = value;
  else throw Error('Invalid value');
};

const getBreakValue: GetBreakValue = () => states.breakValue;

const setModeValue: SetModeValue = (mode) => {
  states.mode = mode;
};

const start: Start = () => {
  states.isRunning = true;
  tick();
};
const pause: Pause = () => (states.isRunning = false);
const stop: Stop = () => {
  states.isRunning = false;
  reset();
};

let onTick: OnTick = null;

const setOnTick: SetOnTick = (onTickCallback) => {
  if (typeof onTickCallback === 'function') {
    onTick = onTickCallback;
  } else {
    throw new TypeError('method must be a function');
  }
};

let onDone: OnDone = null;

const setOnDone: SetOnDone = (onDoneCallback) => {
  if (typeof onDoneCallback === 'function') {
    onDone = onDoneCallback;
  } else {
    throw new TypeError('method must be a function');
  }
};

let onBreak: OnBreak = null;

const setOnBreak: SetOnBreak = (onBreakCallback) => {
  if (typeof onBreakCallback === 'function') {
    onBreak = onBreakCallback;
  } else {
    throw new TypeError('method must be a function');
  }
};

const setCycleCount: SetCycleCount = (value) => {
  if (value <= MAXIMUM_CYCLE && value >= MINIMUM_CYCLE) states.totalCycle = value;
  else throw new Error('invalid value');
};

const onSave: OnSave = () =>
  cache.isCached() ? cache.add(CACHE_ID.TIMER_CYCLE, String(states.totalCycle)) : false;

const timer: Timer = {
  getValue,
  getCycleCount,
  getCurrentCycle,
  getMode,
  getProductivityValue,
  getBreakValue,
  setProductivityValue,
  setBreakValue,
  setModeValue,
  setCycleCount,
  start,
  pause,
  stop,
  setOnTick,
  setOnDone,
  setOnBreak,
  onSave,
};

export default timer;
