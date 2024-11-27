import { Icon, Slider, Timer, Toggle } from '../../components';
import { ID } from '../../constants';
import { theme } from '../../utils';

type OnToggleTheme = (isLight: boolean) => void;

const onToggleTheme: OnToggleTheme = (isLight) => {
  const elementMain = document.querySelector('#main');
  const elemenBody = document.body;
  if (elementMain) {
    if (isLight) elementMain.className = '';
    else elementMain.className = 'main-dark';
  }
  if (elemenBody) {
    if (isLight) elemenBody.className = '';
    else elemenBody.className = 'body-dark';
  }
  const _isLight = isLight ? 'light' : 'dark';
  theme.setValue(_isLight);
  Timer.setTheme(ID.TIMER, _isLight);
  Toggle.setTheme(ID.TOGGLER_ALARM, _isLight);
  Toggle.setTheme(ID.TOGGLER_CACHE, _isLight);
  Icon.Base.setTheme(ID.TOGGLER_INFO, _isLight);
  Icon.Base.setTheme(ID.TOGGLER_HELP, _isLight);
  Icon.Locker.setTheme(ID.TOGGLER_LOCK, _isLight);
  Slider.setTheme(ID.SLIDER_CYCLE, _isLight);
};

export default onToggleTheme;
