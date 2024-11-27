import { Modal } from '../../components';
import Base from '../../components/Icon/Base';
import { ID } from '../../constants';
import { states } from '../../states';

type OnToggleIconInfo = (modal: Modal) => void;

const onToggleIconInfo: OnToggleIconInfo = (modal) => {
  //selected then closed modal and re-render icon
  if (states.activeOverlay === 'info') {
    states.activeOverlay = null;
    Base.setClosed(ID.TOGGLER_INFO, false);
    modal.isOpen(false);
  }
  //not selected then selected and re-render icon
  else if (states.activeOverlay === null) {
    states.activeOverlay = 'info';
    Base.setClosed(ID.TOGGLER_INFO, true);
    modal.isOpen(true);
  } else {
    // do nothing
  }
};

export default onToggleIconInfo;
