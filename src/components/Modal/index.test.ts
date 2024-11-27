import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import Modal from '.';

beforeEach(() => {
  document.body.innerHTML = '';
});
beforeAll(() => {
  document.body.id = 'app';
});

describe('when enter id', () => {
  it('should render if id is distinct', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: '#app',
    });
    modal.render();
    expect(document.body.innerHTML).matchSnapshot();
  });
  it('should throw error if id exist', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: '#app',
    });
    modal.render();
    const modal_with_same_id = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: '#app',
    });
    expect(() => modal_with_same_id.render()).toThrowError();
  });
});

describe('when given content', () => {
  it('should render whatever is given to the content', () => {
    const element = document.createElement('div');
    element.innerHTML = `<div>test</div>`;
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: '#app',
    });
    modal.render();
    expect(document.body.innerHTML).matchSnapshot();
  });
});

describe('when isOpen is set', () => {
  it('should display the content if true', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: true,
      targetElementId: '#app',
    });
    modal.render();
    expect(document.body.innerHTML).matchSnapshot();
  });
  it('should not display the content if false', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: '#app',
    });
    modal.render();
    expect(document.body.innerHTML).matchSnapshot();
  });
});

describe('when given targetElementId', () => {
  it('should render if targetElementId exist', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: '#app',
    });
    modal.render();
    expect(document.body.innerHTML).matchSnapshot();
  });
  it('should throw error if does not exist', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: 'app',
    });

    expect(() => modal.render()).toThrowError();
  });
});

describe('when toggle is set', () => {
  it('should display the content if toggle when isOpen is false', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: false,
      targetElementId: '#app',
    });
    modal.render();
    modal.isOpen(false);

    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('should not display the content if toggle when isOpen is true', () => {
    const element = document.createElement('div');
    const modal = new Modal({
      id: 'test',
      content: element,
      isOpen: true,
      targetElementId: '#app',
    });
    modal.render();
    modal.isOpen(true);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
