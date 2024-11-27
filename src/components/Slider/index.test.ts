import { describe, beforeEach, beforeAll, expect, it } from 'vitest';
import Slider from '.';

beforeEach(() => {
  //clear elements before each test
  document.body.innerHTML = '';
});

beforeAll(() => {
  document.body.id = 'test';
});

describe('when given a id', () => {
  it('should throw error if re-use same id', () => {
    expect(() =>
      Slider({
        id: 'test-1',
        elementTargetID: '#test',
        onChange: (value) => {
          value.toString();
        },
        value: '1',
      })
    ).not.toThrowError();

    expect(() =>
      Slider({
        id: 'test-1',
        elementTargetID: '#test',
        onChange: (value) => {
          value.toString();
        },
        value: '',
      })
    ).toThrowError();

    expect(document.body.innerHTML).matchSnapshot();
  });
});

describe('when given elementTargetID', () => {
  it('should throw error if target element does not exist', () => {
    expect(() =>
      Slider({
        id: 'test-2',
        elementTargetID: 'unknown',
        onChange: (value) => {
          value.toString();
        },
        value: '1',
      })
    ).toThrowError();
  });
  it('should run if elementTarget exist', () => {
    Slider({
      id: 'test-3',
      elementTargetID: '#test',
      onChange: (value) => {
        value.toString();
      },
      value: '1',
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when given label', () => {
  it('should render with label element', () => {
    Slider({
      id: 'test-4',
      label: 'test-4',
      elementTargetID: '#test',
      onChange: (value) => {
        value.toString();
      },
      value: '1',
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when user clicked on button plus', () => {
  it('should call the onChange callback', () => {
    let called = false;
    const callback = (value: number) => {
      value.toString();
      called = true;
    };
    Slider({
      id: 'test-5',
      elementTargetID: '#test',
      onChange: callback,
      value: '1',
    });
    const elementButton = document.querySelector('#slider-test-5-button-plus') as HTMLButtonElement;
    elementButton.click();
    expect(called).toBe(true);
  });

  it('should increment value by 1', () => {
    const testValue = 1;
    Slider({
      id: 'test-6',
      elementTargetID: '#test',
      onChange: (value: number) => expect(value).toBe(2),
      value: String(testValue),
    });
    const elementButton = document.querySelector('#slider-test-6-button-plus') as HTMLButtonElement;
    elementButton.click();
  });

  it('should not called when reached maximum value 48', () => {
    let called = false;
    const callback = (value: number) => {
      value.toString();
      called = true;
    };
    Slider({
      id: 'test-7',
      elementTargetID: '#test',
      onChange: callback,
      value: '48',
    });

    const elementButton = document.querySelector('#slider-test-7-button-plus') as HTMLButtonElement;
    elementButton.click();
    expect(called).toBe(false);
  });
});

describe('when user clicked on button minus', () => {
  it('should call the onChange callback', () => {
    let called = false;
    const callback = (value: number) => {
      value.toString();
      called = true;
    };
    Slider({
      id: 'test-8',
      elementTargetID: '#test',
      onChange: callback,
      value: '2',
    });

    const elementButton = document.querySelector(
      '#slider-test-8-button-minus'
    ) as HTMLButtonElement;
    elementButton.click();
    expect(called).toBe(true);
  });

  it('should decrement value by 1', () => {
    const testValue = 2;
    Slider({
      id: 'test-9',
      elementTargetID: '#test',
      onChange: (value: number) => expect(value).toBe(1),
      value: String(testValue),
    });
    const elementButton = document.querySelector(
      '#slider-test-9-button-minus'
    ) as HTMLButtonElement;
    elementButton.click();
  });

  it('should not called when reached minimum value 1', () => {
    let called = false;
    const callback = (value: number) => {
      value.toString();
      called = true;
    };
    Slider({
      id: 'test-10',
      elementTargetID: '#test',
      onChange: callback,
      value: '1',
    });

    const elementButton = document.querySelector(
      '#slider-test-10-button-minus'
    ) as HTMLButtonElement;
    elementButton.click();
    expect(called).toBe(false);
  });
});

describe('when user slide the slider', () => {
  it('should slide to the destinated value', () => {
    Slider({
      id: 'test-11',
      elementTargetID: '#test',
      onChange: (value: number) => expect(value).toBe(11),
      value: '10',
    });

    const elementButton = document.querySelector('#slider-test-11-input') as HTMLInputElement;
    elementButton.stepUp();
  });
  it('should not slide after reach maximum value 48', () => {
    Slider({
      id: 'test-12',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '48',
    });

    const elementButton = document.querySelector('#slider-test-12-input') as HTMLInputElement;
    elementButton.stepUp();
    expect(Number(elementButton.value)).toBe(48);
  });
  it('should not slide after reach minimum value 1', () => {
    Slider({
      id: 'test-13',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '1',
    });

    const elementButton = document.querySelector('#slider-test-13-input') as HTMLInputElement;
    elementButton.stepDown();
    expect(Number(elementButton.value)).toBe(1);
  });
});

describe('when given value', () => {
  it('should reflect as given', () => {
    Slider({
      id: 'test-14',
      label: 'cycles',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '8',
    });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should matched the input value', () => {
    Slider({
      id: 'test-15',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '5',
    });

    const elementButton = document.querySelector('#slider-test-15-input') as HTMLInputElement;
    expect(Number(elementButton.value)).toBe(5);
  });
});

describe('when user locked', () => {
  it('should locked the elements', () => {
    Slider({
      id: 'test-16',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '5',
    });

    Slider.setLock('test-16', true);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should unlocked the elements after clicking locked state', () => {
    Slider({
      id: 'test-17',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '5',
    });

    Slider.setLock('test-17', true);
    Slider.setLock('test-17', false);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('when set theme', () => {
  it('should show light theme when set light', () => {
    Slider({
      id: 'test-18',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '5',
    });

    Slider.setTheme('test-18', 'light');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should show dark theme when set dark', () => {
    Slider({
      id: 'test-19',
      elementTargetID: '#test',
      onChange: (value: number) => {
        value.toFixed();
      },
      value: '5',
    });

    Slider.setTheme('test-19', 'dark');
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
