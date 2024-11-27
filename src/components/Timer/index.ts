import { Chart, DoughnutController, ArcElement, type ChartType } from 'chart.js';
import Classes from './index.module.css';
import { ICON_PLAY, ICON_STOP, ICON_PAUSE } from '../../assets';
import {
  ClassnamesIconPlayPause,
  ClassnamesIconStop,
  CreateArrayRepresentCurrentCycleInChart,
  CreateArrayRepresentCycleCountInChart,
  CreateChart,
  CreateClickEvent,
  CycleSpacing,
  GetDataChartCycleConfig,
  GetDataChartTimerConfig,
  GetPercentCurrentTimeInAnHour,
  GetTimeInSec,
  InitializeComponent,
  IsPlay,
  OnPause,
  OnPlay,
  OnStop,
  SetCycle,
  SetTheme,
  States,
  TimerType,
  UpdateChart,
  UpdateChartInternal,
} from './type';
import classNames from 'classnames';
import { isWithinTime, isZeroOrNegative, timer } from '../../utils';
import { ID } from '../../constants';
// optimised bundle size with required features
Chart.register(DoughnutController, ArcElement);

// classnames controller
const classnamesIconPlayPause: ClassnamesIconPlayPause = (isDark) =>
  classNames(Classes['icon-play-pause'], {
    [Classes.dark]: isDark,
  });

const classnamesIconStop: ClassnamesIconStop = (isDark) =>
  classNames(Classes['icon-stop'], {
    [Classes.dark]: isDark,
  });

const states: States = {};

// TODO: optimised in a way controller, view layer is better seperated
// re-sizing limitation https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
const Timer: TimerType = ({
  id,
  totalCycle,
  currentCycle,
  minutes,
  seconds,
  isDark,
  isBreak,
  onPlay,
  onPause,
  onStop,
  onDone,
  onBreak,
}) => {
  if (Object.hasOwn(states, id))
    throw new Error('existed property, make sure property name is distinct');
  if (!isWithinTime(minutes)) throw new Error('minutes is out of acceptable time');
  if (!isWithinTime(seconds)) throw new Error('seconds is out of acceptable time');
  if (isZeroOrNegative(currentCycle)) throw new Error('current cycle is out of acceptable time');
  if (isZeroOrNegative(totalCycle)) throw new Error('total cycle is out of acceptable time');

  states[id] = {
    totalCycle,
    currentCycle,
    isPlay: false,
    isDark,
    isBreak,
    minutes,
    seconds,
    onPlay,
    onPause,
    onStop,
    onDone,
    onBreak,
  };

  // setup timer
  timer.setModeValue(isBreak ? 'break' : 'productivity');
  timer.setCycleCount(totalCycle);

  const renderTimeChart = `
  <div class="${Classes.timer}">
    <div>
      <canvas id="timer-${id}"></canvas>
    </div>
  </div>
`;

  const renderCycleChart = `
  <div class="${Classes.cycle}">
    <div>
      <canvas id="timer-cycle-${id}"></canvas>
    </div>
  </div>`;

  const renderPlayOrPause = `<div id="icon-play-pause-${id}" class="${classnamesIconPlayPause(isDark)}">${ICON_PLAY}</div>`;

  const renderStop = `<div id="icon-stop-${id}" class="${classnamesIconStop(isDark)}">${ICON_STOP}</div>`;

  return `
    <div class="${Classes.container}">
      <div>
        ${renderTimeChart}
        <div class="${Classes.cover}"></div>
        ${renderCycleChart}
        ${renderPlayOrPause}
        ${renderStop}
      </div>
    </div>
      `;
};

const isPlay: IsPlay = (id) => {
  states[id].isPlay ? onPause(id) : onPlay(id);
};

timer.setOnBreak(() => {
  const onBreak = states[ID.TIMER].onBreak;
  if (onBreak) onBreak();
});

//TODO: bad hardcode id
timer.setOnTick(({ min, sec }, mode, currentCycle) => {
  const isBreak = mode === 'break' ? true : false;
  updateChart(
    {
      timer: { min, sec, isBreak },
    },
    ID.TIMER
  );
  updateChart(
    { cycle: { totalCycle: timer.getCycleCount(), cycle: currentCycle, isBreak } },
    ID.TIMER
  );
});

timer.setOnDone(() => {
  const element = document.querySelector(`#icon-play-pause-timer`);
  if (element) element.innerHTML = `${ICON_PLAY}`;
  states.timer.isPlay = false;
  const onDone = states.timer.onDone;
  if (onDone) onDone();
});

const onPlay: OnPlay = (id) => {
  const element = document.querySelector(`#icon-play-pause-${id}`);
  if (element) element.innerHTML = `${ICON_PAUSE}`;
  states[id].isPlay = true;
  timer.start();
  states[id].onPlay();
};

const onPause: OnPause = (id) => {
  timer.pause();
  const element = document.querySelector(`#icon-play-pause-${id}`);
  if (element) element.innerHTML = `${ICON_PLAY}`;
  states[id].isPlay = false;
  states[id].onPause();
};

const onStop: OnStop = (id) => {
  timer.stop();
  const element = document.querySelector(`#icon-play-pause-${id}`);
  if (element) element.innerHTML = `${ICON_PLAY}`;
  states[id].isPlay = false;
  states[id].onStop();
  try {
    updateChart({ timer: { min: 0, sec: 0, isBreak: false } }, id);
    updateChart({ cycle: { totalCycle: timer.getCycleCount(), cycle: 1, isBreak: false } }, id);
  } catch (error) {
    console.error(error); // supress this error due to chart object not able to setup properly for test
  }
};

const updateChart: UpdateChart = (type, id) => {
  if ('timer' in type)
    updateChartInternal(
      'chartTimer',
      id,
      getDataChartTimerConfig(id, type.timer.min, type.timer.sec, type.timer.isBreak)
    );
  else
    updateChartInternal(
      'chartCycle',
      id,
      getDataChartCycleConfig(id, type.cycle.totalCycle, type.cycle.cycle, type.cycle.isBreak)
    );
};

const updateChartInternal: UpdateChartInternal = (chartObjectID, id, config) => {
  const chart = states[id][chartObjectID];
  if (chart === undefined) throw new Error('undefined Chart');
  chart.data.datasets.forEach((dataset, index) => {
    Object.assign(dataset, config.data.datasets[index]);
  });
  chart.update();
};

const createArrayRepresentCycleCountInChart: CreateArrayRepresentCycleCountInChart = (
  totalCycle: number
) => Array.from<number>({ length: totalCycle }).fill(1);

const createArrayRepresentCurrentCycleInChart: CreateArrayRepresentCurrentCycleInChart = (
  totalCycle,
  currentCycle,
  isBreak
) => {
  const arrayRepresentCurrentCycle = Array.from<string>({ length: totalCycle }).fill('#CCCCCC');
  for (let index = 0; index < currentCycle; index++) {
    arrayRepresentCurrentCycle[index] = isBreak ? '#37D2D2' : '#FF4949';
  }
  return arrayRepresentCurrentCycle;
};

const cycleSpacing: CycleSpacing = (totalCycle) => (totalCycle === 1 ? 0 : 10);

const getTimeInSec: GetTimeInSec = (min, sec) => min * 60 + sec;

const getPercentCurrentTime: GetPercentCurrentTimeInAnHour = (timeInSec, totalTime) =>
  (timeInSec / totalTime) * 100;

const getDataChartTimerConfig: GetDataChartTimerConfig = (id, min, sec, isBreak) => {
  const timeInSec = getTimeInSec(min, sec);

  let totalTime = 3600;
  if (isBreak) totalTime = timer.getBreakValue() * 60;
  else totalTime = timer.getProductivityValue() * 60;

  const percentCurrentTimeInAnHour = getPercentCurrentTime(timeInSec, totalTime);
  const dataTimer = {
    datasets: [
      {
        label: `timer-${id}`,
        data: [percentCurrentTimeInAnHour, 100 - percentCurrentTimeInAnHour],
        backgroundColor: [isBreak ? '#37D2D2' : '#FF4949', '#CCCCCC'],
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };

  const configTimer = {
    type: 'doughnut' as ChartType,
    data: dataTimer,
    options: {
      cutout: 135,
      layout: {
        padding: 10,
      },
    },
  };

  return configTimer;
};

const getDataChartCycleConfig: GetDataChartCycleConfig = (
  id,
  totalCycle,
  currentCycle,
  isBreak
) => {
  const dataCycle = {
    datasets: [
      {
        label: `timer-cycle-${id}`,
        data: createArrayRepresentCycleCountInChart(totalCycle),
        backgroundColor: createArrayRepresentCurrentCycleInChart(totalCycle, currentCycle, isBreak),
        borderWidth: 0,
        spacing: cycleSpacing(totalCycle),
        hoverOffset: 0,
      },
    ],
  };

  const configCycle = {
    type: 'doughnut' as ChartType,
    data: dataCycle,
    options: {
      cutout: 100,
      layout: {
        padding: 10,
      },
    },
  };

  return configCycle;
};

const createChart: CreateChart = (elementID, id, config, chartObjectID) => {
  const element = document.querySelector(elementID) as HTMLCanvasElement;
  if (element) states[id][chartObjectID] = new Chart(element, config);
};

const createClickEvent: CreateClickEvent = (elementID, callback) => {
  const element = document.querySelector(elementID);
  element?.addEventListener('click', callback);
};

const setTheme: SetTheme = (id, value) => {
  const elementIconPlayPause = document.querySelector(`#icon-play-pause-${id}`) as HTMLDivElement;
  const elementIconStop = document.querySelector(`#icon-stop-${id}`) as HTMLDivElement;
  if (value === 'light') {
    elementIconPlayPause.className = classnamesIconPlayPause(false);
    elementIconStop.className = classnamesIconStop(false);
    states[id].isDark = false;
  } else {
    elementIconPlayPause.className = classnamesIconPlayPause(true);
    elementIconStop.className = classnamesIconStop(true);
    states[id].isDark = true;
  }
};

const initializeComponent: InitializeComponent = () => {
  Object.keys(states).forEach((id) => {
    createChart(
      `#timer-${id}`,
      id,
      getDataChartTimerConfig(id, states[id].minutes, states[id].seconds, states[id].isBreak),
      'chartTimer'
    );

    createChart(
      `#timer-cycle-${id}`,
      id,
      getDataChartCycleConfig(
        id,
        states[id].totalCycle,
        states[id].currentCycle,
        states[id].isBreak
      ),
      'chartCycle'
    );

    if (states[id].onPause !== undefined && states[id].onPlay !== undefined)
      createClickEvent(`#icon-play-pause-${id}`, () => isPlay(id));

    if (states[id].onStop !== undefined) createClickEvent(`#icon-stop-${id}`, () => onStop(id));
  });
};

document.addEventListener('DOMContentLoaded', initializeComponent);

const setCycle: SetCycle = (id, value) => {
  timer.setCycleCount(value);
  updateChart(
    {
      cycle: {
        totalCycle: value,
        cycle: timer.getCurrentCycle(),
        isBreak: timer.getMode() === 'break',
      },
    },
    id
  );
};

Timer.setTheme = setTheme;
Timer.setCycle = setCycle;

export default Timer;
