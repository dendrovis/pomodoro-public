export type States = {
  [id: string]: {
    elementInput?: HTMLInputElement;
    elementButtonMinus?: HTMLButtonElement;
    elementButtonPlus?: HTMLButtonElement;
    elementLabel?: HTMLLabelElement;
  };
};

export type RenderLabel = (params: {
  label?: string;
  id: string;
  elementTarget: Element;
  value: string;
}) => HTMLLabelElement | undefined;

type OnChange = (value: number) => void;

export type RenderInput = (params: {
  id: string;
  elementTarget: Element;
  elementLabel?: HTMLLabelElement;
  value: string;
  onChange: OnChange;
}) => HTMLInputElement;

export type RenderContainer = (params: { id: string; elementTarget: Element }) => HTMLDivElement;
export type RenderInnerContainer = (params: {
  id: string;
  elementTarget: Element;
}) => HTMLDivElement;

export type RenderMinusButton = (params: {
  id: string;
  elementInput: HTMLInputElement;
  elementLabel?: HTMLLabelElement;
  elementTarget: Element;
  onChange: (value: number) => void;
}) => void;

export type RenderPlusButton = (params: {
  id: string;
  elementInput: HTMLInputElement;
  elementLabel?: HTMLLabelElement;
  elementTarget: Element;
  onChange: (value: number) => void;
}) => void;

export type GetNewLabel = (value: string, labelOrigin: string) => string;

export type SetTheme = (id: string, theme: 'light' | 'dark') => void;

export type SetLock = (id: string, isLock: boolean) => void;
export interface SliderType {
  (params: {
    id: string;
    label?: string;
    elementTargetID: string;
    onChange: (value: number) => void;
    value: string;
  }): void;
  setTheme: SetTheme;
  setLock: SetLock;
}
