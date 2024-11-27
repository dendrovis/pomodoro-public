import { describe, expect, it } from 'vitest';
import Toggle from '.';
import { ICON_ALARM_OFF, ICON_ALARM_ON, IMG_LIGHT_DARK } from '../../assets';

describe('when given id', () => {
  it('should render correctly on the test id', () => {
    expect(
      Toggle({
        id: 'test',
        iniValue: false,
      })
    ).toMatchSnapshot();
  });

  it('should throw error if same id appear twice', async () => {
    expect(() =>
      Toggle({
        id: 'test',
        iniValue: false,
      })
    ).toThrowError();
  });
});

describe('when given icons', () => {
  it('should not render icon if incomplete', () => {
    expect(
      Toggle({
        id: 'test-2',
        iconOff: ICON_ALARM_OFF,
        iniValue: false,
      })
    ).toMatchSnapshot();
  });

  it('should render icon if complete', () => {
    expect(
      Toggle({
        id: 'test-3',
        iconOff: ICON_ALARM_OFF,
        iconOn: ICON_ALARM_ON,
        iniValue: false,
      })
    ).toMatchSnapshot();
  });
});

describe('when given label', () => {
  it('should render the label out', () => {
    expect(
      Toggle({
        id: 'test-4',
        label: 'sample label',
        iniValue: false,
      })
    ).toMatchSnapshot();
  });
});

describe('when given value', () => {
  it('should render on when set is true', () => {
    expect(
      Toggle({
        id: 'test-5',
        iniValue: true,
      })
    ).toMatchSnapshot();
  });
  it('should render off when set is false', () => {
    expect(
      Toggle({
        id: 'test-6',
        iniValue: false,
      })
    ).toMatchSnapshot();
  });
});

describe('when user click the component given on state', () => {
  it('should render on if the logic return the same value', () => {
    document.body.innerHTML = Toggle({
      id: 'test-7',
      iniValue: true,
      onToggle: (value) => {
        return value;
      },
    });

    const componentID = '#toggle-test-7';

    const element = document.querySelector(componentID);
    element && element.dispatchEvent(new Event('click'));
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should render on if the logic return the inverse value', () => {
    document.body.innerHTML = Toggle({
      id: 'test-8',
      iniValue: true,
      onToggle: (value) => {
        return !value;
      },
    });

    const componentID = '#toggle-test-8';
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const element = document.querySelector(componentID);
    element && element.dispatchEvent(new Event('click'));
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when given custom background image', () => {
  it('should render', () => {
    const element = Toggle({
      id: 'test-9',
      iniValue: false,
      backgroundImage: IMG_LIGHT_DARK,
    });
    expect(element).toMatchSnapshot();
  });
});

describe('when given custom toggle on and off color', () => {
  it('should render', () => {
    const element = Toggle({
      id: 'test-10',
      iniValue: false,
      colorToggle: { on: '#FEF7F7', off: '#545454' },
    });
    expect(element).toMatchSnapshot();
  });
});

describe('when given lock value', () => {
  it('render locked if true', () => {
    const element = Toggle({
      id: 'test-11',
      isLock: true,
      iniValue: false,
    });
    expect(element).toMatchSnapshot();

    document.body.innerHTML = Toggle({
      id: 'test-12',
      isLock: false,
      iniValue: false,
    });
    Toggle.setLock('test-12', true);
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('render unlock if false', () => {
    const element = Toggle({
      id: 'test-13',
      isLock: false,
      iniValue: false,
    });
    expect(element).toMatchSnapshot();

    document.body.innerHTML = Toggle({
      id: 'test-14',
      isLock: true,
      iniValue: false,
    });
    Toggle.setLock('test-14', false);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
