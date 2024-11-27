import { Icon, Loading, Modal, MotionImage, Slider, Timer, Toggle } from './components';
import './styles/index.css';
import { alarmer, theme } from './utils';
import {
  ICON_ALARM_OFF,
  ICON_ALARM_ON,
  ICON_CACHE_OFF,
  ICON_CACHE_ON,
  ICON_HELP,
  ICON_INFO,
  ICON_LOGO,
  IMG_DENDROVIS,
  IMG_LIGHT_DARK,
  IMG_MOON,
  IMG_SUN,
} from './assets';

import {
  onBreak,
  onChangeSlider,
  onClose,
  onDone,
  onLoad,
  onPause,
  onPlay,
  onStop,
  onToggleAlarm,
  onToggleCache,
  onToggleIconHelp,
  onToggleIconInfo,
  onToggleLock,
  onToggleTheme,
} from './events';
import { ID } from './constants';
import { setTheme } from './events/system/onLoad';

const { isCache, isLocked, totalCycle, themeType } = onLoad();
Loading('.container-load');
setTimeout(() => {
  const loadingElement = document.querySelector('.container-load');
  if (!loadingElement) throw new Error('element not exist');
  loadingElement.className = 'container-load container-load-disabled';
}, 300);

//populate features
const elementHelp = document.createElement('div');
const styleBox =
  'user-select:none;background-color:black;border-radius:3rem;padding:0.5rem;color:#fef7f7;position:absolute;';
elementHelp.innerHTML = `
  <div style="${styleBox}left:10%;top:1rem">dark and light mode</div>
  <div style="${styleBox}right:13%;top:20rem">25 mins <span style="color:#ff4949">productive</span> time</div>
  <div style="${styleBox}right:13%;top:23rem">5 mins <span style="color:#37D2D2">break</span> time</div>
  <div style="${styleBox}right:20%;top:30rem">number of cycles</div>
  <div style="${styleBox}right:40%;top:35rem">play or pause timer</div>
  <div style="${styleBox}right:10%;top:43rem">stop and reset timer</div>
  <div style="${styleBox}right:25%;top:50rem">total set of cycle(s)</div>
  <div style="${styleBox}right:70%;top:58rem">decrease cycle</div>
  <div style="${styleBox}right:43%;top:56rem">slide-able cycle</div>
  <div style="${styleBox}right:15%;top:58rem">increase cycle</div>
  <div style="${styleBox}right:28%;top:62rem">set alarm on or off</div>
  <div style="${styleBox}right:28%;top:68rem">set cache on or off</div>
  <div style="${styleBox}right:28%;top:74rem">lock the above inputs</div>
`;

const elementInfo = document.createElement('div');
elementInfo.innerHTML = `
    <div style="width:100%;display:flex;justify-content:center;align-items:center;filter:drop-shadow(0.3rem 0.3rem 0.2rem rgba(0 0 0 / 25%));"><img style="width:25%" src="${ICON_LOGO}" alt="logo.svg"></div>
    <div style="padding:1rem;width:100%;display:flex;justify-content:center;align-items:center;color:#fef7f7;">
      <div style="padding:1rem 2rem;width:70%;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#545454;border-radius:2rem;filter:drop-shadow(0.3rem 0.3rem 0.2rem rgba(0 0 0 / 25%));">
        <h1>About</h2>
        <p>A simple Pomofocus application for anyone who needs it.</p>
        <h1>Motivation</h2>
        <p>Tired of Pomofocus application that shipped with bloated features that does not serve me well. Thus, a great opportunities for me make one. In addition, as a means to refresh my frontend skills and have fun.</p>
        <div style="width:100%;display:flex;justify-content:center;align-items:center;"><img style="width:35%" src="${IMG_DENDROVIS}" alt="logo_dendrovis.webp"></div>
        <h3>Product of Dendrovis</h3>
        <p>Version : ${APP_VERSION}</p>
      </div>
    </div>
  `;

const modalHelp = new Modal({
  id: ID.TOGGLER_HELP,
  content: elementHelp,
  targetElementId: '.container-modal-help',
  isOpen: false,
});

modalHelp.render();

const modalInfo = new Modal({
  id: ID.TOGGLER_INFO,
  content: elementInfo,
  targetElementId: '.container-modal-info',
  isOpen: false,
});

modalInfo.render();

const elementTheme = document.querySelector<HTMLDivElement>('.container-settings-theme');
const elementTimer = document.querySelector<HTMLDivElement>('.container-timer-watch');
const elementAlarm = document.querySelector<HTMLDivElement>('.container-settings-alarm');
const elementCache = document.querySelector<HTMLDivElement>('.container-settings-cache');
const elementLocker = document.querySelector<HTMLDivElement>('.container-locker');
const elementOverlay = document.querySelector<HTMLDivElement>('.container-overlay');

if (
  !elementTheme ||
  !elementTimer ||
  !elementAlarm ||
  !elementCache ||
  !elementLocker ||
  !elementOverlay
)
  throw new Error('undefined element');

elementTheme.innerHTML = Toggle({
  iconOn: IMG_SUN,
  iconOff: IMG_MOON,
  colorToggle: { on: '#FEF7F7', off: '#545454' },
  backgroundImage: IMG_LIGHT_DARK,
  id: ID.TOGGLER_THEME,
  onToggle: onToggleTheme,
  iniValue: theme.getValue() === 'light' ? true : false,
});

MotionImage(ID.TIMER_CHARACTER, '.container-animated-image');

elementTimer.innerHTML = Timer({
  id: ID.TIMER,
  totalCycle: totalCycle,
  currentCycle: 1,
  isDark: theme.getValue() === 'dark' ? true : false,
  minutes: 0,
  seconds: 0,
  isBreak: false,
  onPlay: () => onPlay(ID.SLIDER_CYCLE, ID.TIMER_CHARACTER),
  onPause: () => onPause(ID.SLIDER_CYCLE, ID.TIMER_CHARACTER),
  onStop: () => onStop(ID.SLIDER_CYCLE, ID.TIMER_CHARACTER),
  onDone: () => onDone(ID.SLIDER_CYCLE, ID.TIMER_CHARACTER),
  onBreak,
});

Slider({
  id: ID.SLIDER_CYCLE,
  label: 'Cycle',
  elementTargetID: '.container-timer-cycle-input',
  onChange: (value) => onChangeSlider(ID.TIMER, value),
  value: String(totalCycle),
});

elementAlarm.innerHTML = `<div>
${Toggle({
  iconOn: ICON_ALARM_ON,
  iconOff: ICON_ALARM_OFF,
  label: 'Alarm',
  id: ID.TOGGLER_ALARM,
  onToggle: onToggleAlarm,
  iniValue: alarmer.getValue(),
})}
</div>`;

elementCache.innerHTML = `<div>
${Toggle({
  iconOn: ICON_CACHE_ON,
  iconOff: ICON_CACHE_OFF,
  label: 'Cache',
  id: ID.TOGGLER_CACHE,
  onToggle: onToggleCache,
  iniValue: isCache,
})}
</div>`;
Icon.Locker({
  id: ID.TOGGLER_LOCK,
  isLocked,
  theme: themeType,
  onClick: (isLocked) =>
    onToggleLock(isLocked, ID.TOGGLER_ALARM, ID.TOGGLER_CACHE, ID.SLIDER_CYCLE),
  elementTargetID: '.container-locker',
});

Icon.Base({
  id: ID.TOGGLER_INFO,
  icon: ICON_INFO,
  onClick: () => onToggleIconInfo(modalInfo),
  elementTargetID: '.container-content',
});

Icon.Base({
  id: ID.TOGGLER_HELP,
  icon: ICON_HELP,
  onClick: () => {
    onToggleIconHelp(modalHelp);
  },
  elementTargetID: '.container-content',
});

onClose();

//onload data update component with the features
setTheme(themeType);
onToggleLock(isLocked, ID.TOGGLER_ALARM, ID.TOGGLER_CACHE, ID.SLIDER_CYCLE);
