import type {
  Chart,
  BubbleDataPoint,
  Point,
  _DeepPartialObject,
  ChartConfiguration,
} from 'chart.js';

export type Properties = {
  totalCycle: number;
  currentCycle: number;
  minutes: number;
  seconds: number;
  isDark?: boolean;
  isBreak: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onDone?: () => void;
  onBreak?: () => void;
};

export type ClassnamesIconPlayPause = (isDark?: boolean) => string;
export type ClassnamesIconStop = (isDark?: boolean) => string;

type TimerProps = { id: string } & Properties;

export type States = {
  [id: string]: Properties & { chartTimer?: Chart; chartCycle?: Chart; isPlay: boolean };
};

export type UpdateChart = (
  type:
    | { timer: { min: number; sec: number; isBreak: boolean } }
    | { cycle: { cycle: number; totalCycle: number; isBreak: boolean } },
  id: string
) => void;
export type UpdateChartInternal = (
  chartObjectID: 'chartTimer' | 'chartCycle',
  id: string,
  config: ChartConfiguration
) => void;

export type CreateArrayRepresentCycleCountInChart = (
  totalCycle: number
) => (number | [number, number] | Point | BubbleDataPoint | null)[]; // follow chart.js property acceptable type

export type CreateArrayRepresentCurrentCycleInChart = (
  totalCycle: number,
  currentCycle: number,
  isBreak: booleanm
) => (
  | string
  | _DeepPartialObject<CanvasGradient>
  | _DeepPartialObject<CanvasPattern>
  | undefined
)[]; // follow chart.js property acceptable type

export type CycleSpacing = (totalCycle: number) => number;
export type GetTimeInSec = (min: number, sec: number) => number;
export type GetPercentCurrentTimeInAnHour = (timeInSec: number, totalTime: number) => number;
export type GetDataChartTimerConfig = (
  id: string,
  min: number,
  sec: number,
  isBreak: boolean
) => ChartConfiguration;
export type GetDataChartCycleConfig = (
  id: string,
  totalCycle: number,
  currentCycle: number,
  isBreak: boolean
) => ChartConfiguration;

export type CreateChart = (
  elementID: string,
  id: string,
  config: ChartConfiguration,
  chartObjectID: 'chartTimer' | 'chartCycle'
) => void;

export type CreateClickEvent = (
  elementID: string,
  callback: EventListenerOrEventListenerObject
) => void;

export type InitializeComponent = () => void;

export type IsPlay = (id) => void;
export type OnPlay = (id) => void;
export type OnPause = (id) => void;
export type OnStop = (id) => void;

export type SetTheme = (id: string, value: 'dark' | 'light') => void;
export type SetCycle = (id: string, value: number) => void;
export interface TimerType {
  (props: TimerProps): string;
  setTheme: SetTheme;
  setCycle: SetCycle;
}
