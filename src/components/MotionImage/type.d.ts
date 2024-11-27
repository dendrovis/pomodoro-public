export type States = { [id: string]: { state: AnimatedType; elementContainer: HTMLDivElement } };
export type AnimatedType = 'idle' | 'run';
export type CreateContainer = (id: string) => HTMLDivElement;
export type SetAnimate = (id: string, type: AnimatedType) => void;
export interface MotionImageType {
  (id: string, elementTargetID: string): void;
  setAnimate: SetAnimate;
}
