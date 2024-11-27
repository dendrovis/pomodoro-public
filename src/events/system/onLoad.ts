import { Icon, Slider, Toggle } from '../../components';
import { CACHE_ID, ID, PRODUCT_ID } from '../../constants';
import { alarmer, cache, lastArrayElement, locker, theme, timer } from '../../utils';

type OnLoad = () => {
  isAlarm: boolean;
  isCache: boolean;
  isLocked: boolean;
  totalCycle: number;
  themeType: Theme;
};
type Theme = 'dark' | 'light';

export const setTheme = (theme: Theme) => {
  const elementMain = document.querySelector('#main') as HTMLDivElement;
  const elemenBody = document.body as HTMLBodyElement;
  if (!elementMain || !elemenBody) throw new Error('undefined element');

  if (theme === 'light') elementMain.className = '';
  else elementMain.className = 'main-dark';

  if (theme === 'light') elemenBody.className = 'body-loaded';
  else elemenBody.className = 'body-dark body-loaded';

  Toggle.setTheme(ID.TOGGLER_ALARM, theme);
  Toggle.setTheme(ID.TOGGLER_CACHE, theme);
  Slider.setTheme(ID.SLIDER_CYCLE, theme);
  Icon.Base.setTheme(ID.TOGGLER_INFO, theme);
  Icon.Base.setTheme(ID.TOGGLER_HELP, theme);
  !locker.getValue() && Icon.Locker.setTheme(ID.TOGGLER_LOCK, theme);
};

const onLoad: OnLoad = () => {
  //default config
  let isAlarm = false;
  let isCache = false; // set ui off only, as cache off remove cache
  let isLocked = false;
  let totalCycle = 3;
  let themeType: Theme = 'dark';

  // set user prefer choice if any
  cache.setProductID(PRODUCT_ID);
  const keys = cache.getCache();
  if (keys.length > 0) isCache = true;
  keys.forEach((key) => {
    const actualKey = lastArrayElement(key, '_');
    try {
      if (CACHE_ID.ALARM === actualKey) {
        isAlarm = localStorage.getItem(key) === 'true';
      } else if (CACHE_ID.LOCKER === actualKey) {
        isLocked = localStorage.getItem(key) === 'true';
      } else if (CACHE_ID.THEME === actualKey) {
        themeType = String(localStorage.getItem(key)) as Theme;
      } else if (CACHE_ID.TIMER_CYCLE === actualKey) {
        totalCycle = Number(localStorage.getItem(key));
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  });
  // set values
  theme.setValue(themeType);
  alarmer.setValue(isAlarm);
  if (isCache) cache.on();
  timer.setCycleCount(totalCycle);
  locker.setValue(isLocked);
  return { isAlarm, isCache, isLocked, totalCycle, themeType };
};

export default onLoad;
