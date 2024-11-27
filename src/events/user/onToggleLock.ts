import { Slider, Toggle } from '../../components';
import { states } from '../../states';
import { locker } from '../../utils';

type OnToggleLock = (isLocked: boolean, alarmId: string, cacheId: string, sliderId: string) => void;

const onToggleLock: OnToggleLock = (isLocked, alarmId, cacheId, sliderId) => {
  locker.setValue(isLocked);
  Toggle.setLock(alarmId, isLocked);
  Toggle.setLock(cacheId, isLocked);
  if (!(states.timer === 'play')) Slider.setLock(sliderId, isLocked);
};

export default onToggleLock;
