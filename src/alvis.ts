import * as Two from "twojs-ts";

export class Alvis {
  protected htmlElement: HTMLElement | null = null;
  protected two = new Two({
    fullscreen: true,
    autostart: true,
  });

  constructor(element: HTMLElement) {
    this.two.appendTo(element);
    this.htmlElement = element;
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
  ) {
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
