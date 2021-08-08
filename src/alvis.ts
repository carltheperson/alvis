import * as Two from "twojs-ts";
import { Event, EventCallBack } from "./event";

export class Alvis {
  protected htmlElement: HTMLElement | null = null;
  private events: Event[] = [];
  protected two = new Two({
    fullscreen: true,
    autostart: true,
  });

  constructor(element: HTMLElement) {
    this.two.appendTo(element);
    this.htmlElement = element;

    this.bindUpdateCallback(() => {
      this.events =
        this.events.filter((listener) => !listener.removeNextCall) ?? [];

      const currentTimeMs = new Date().getTime();
      this.events.forEach((event) => {
        event.callback(
          currentTimeMs - event.creationTime,
          event.next.bind(event)
        );
      });
    });
  }

  protected getEventPromise(callback: EventCallBack): Promise<void> {
    return new Promise<void>((resolve) => {
      this.events.push(new Event(callback, () => resolve()));
    });
  }

  protected bindUpdateCallback(callback: (frameCount: number) => void): void {
    this.two.bind(Two.Events.update, (arg) => {
      if (arg === undefined) {
        callback(0);
      }
      callback(arg as unknown as number);
    });
  }

  protected bindResizeCallback(
    callback: (width: number, height: number) => void
  ): void {
    if (this.htmlElement) {
      new ResizeObserver(() => {
        if (this.htmlElement)
          callback(
            this.htmlElement.clientWidth,
            this.htmlElement?.clientHeight
          );
      }).observe(this.htmlElement);
    }
  }
}
