import { Modal } from '../../components';
import Base from '../../components/Icon/Base';
import { ID } from '../../constants';
import { states } from '../../states';

type OnToggleIconHelp = (modal: Modal) => void;

const onToggleIconHelp: OnToggleIconHelp = (modal) => {
  //selected then closed modal and re-render icon
  if (states.activeOverlay === 'help') {
    states.activeOverlay = null;
    Base.setClosed(ID.TOGGLER_HELP, false);
    modal.isOpen(false);
  }
  //not selected then selected and re-render icon
  else if (states.activeOverlay === null) {
    states.activeOverlay = 'help';
    Base.setClosed(ID.TOGGLER_HELP, true);
    modal.isOpen(true);
  } else {
    // do nothing
  }
};

export default onToggleIconHelp;
