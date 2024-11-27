import Classes from './index.module.css';

type States = Properties & { elementContainer?: HTMLDialogElement };
type Properties = { id: string; content: Element; targetElementId: string; isOpen: boolean };
export default class Modal {
  #states: States;

  constructor(params: Properties) {
    this.#states = params;
  }

  isOpen(value: boolean) {
    this.#states.isOpen = value;
    if (this.#states.elementContainer) this.#states.elementContainer.open = this.#states.isOpen;
  }

  #createElementContainer() {
    const element = document.createElement('dialog') as HTMLDialogElement;
    element.id = this.#states.id;
    element.className = `${Classes.container}`;
    element.open = this.#states.isOpen;
    this.#states.elementContainer = element;
    return element;
  }

  #appendElement(elementSource: Element, elementDestination: Element) {
    elementDestination.appendChild(elementSource);
  }

  render() {
    const elementExist = document.querySelector(`#${this.#states.id}`);
    if (elementExist) throw new Error('element existed please try a new id');
    const element = document.querySelector(this.#states.targetElementId);
    if (!element) throw new Error('undefined element');
    const elementContainer = this.#createElementContainer();
    this.#appendElement(this.#states.content, elementContainer);
    this.#appendElement(elementContainer, element);
  }
}
