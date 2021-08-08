export type EventCallBack = (ms: number, next: () => void) => void;

export class Event {
  removeNextCall = false;
  creationTime = new Date().getTime();
  callback: EventCallBack = () => undefined;
  done: () => void = () => undefined;

  constructor(callback: EventCallBack, done: () => void) {
    this.callback = callback;
    this.done = done;
  }

  next(): void {
    this.removeNextCall = true;
    this.done();
  }
}
