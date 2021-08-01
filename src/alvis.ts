import * as Two from "twojs-ts";

export class Alvis {
  protected two = new Two({
    fullscreen: true,
    autostart: true,
  }).appendTo(document.body);

  protected bindUpdateCallback(callback: (frameCount: number) => void): void {
    this.two.bind(Two.Events.update, (arg) => {
      if (arg === undefined) {
        callback(0);
      }
      callback(arg as unknown as number);
    });
  }
}
