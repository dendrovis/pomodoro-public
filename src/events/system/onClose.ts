import { PRODUCT_ID } from '../../constants';
import { alarmer, cache, locker, theme, timer } from '../../utils';

type OnClose = () => void;

const onClose: OnClose = () => {
  cache.setProductID(PRODUCT_ID);
  if (cache.isCached() === false) return;
  alarmer.onSave();
  theme.onSave();
  locker.onSave();
  timer.onSave();
};

// onclosed listener
window.onbeforeunload = () => onClose();

export default onClose;
