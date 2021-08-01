import * as Two from "twojs-ts";
import { Alvis } from "./alvis";

enum Duration {
  SWAP = 500,
}

interface Rectangle extends Two.Rectangl {
  index: number;
  text: Two.Text;
}

type ListenerCallBack = (ms: number, remove: () => void) => void;

class Listener {
  removeNextCall = false;
  initialMs = new Date().getTime();
  callback: ListenerCallBack = () => {};

  constructor(callback: ListenerCallBack) {
    this.callback = callback;
  }

  remove(): void {
    this.removeNextCall = true;
  }
}

export class Array2D extends Alvis {
  private rectangles: Rectangle[] = [];
  private listeners: Listener[] = [];

  constructor() {
    super();
    this.rectangles = this.generateRectangles(5);
    super.bindUpdateCallback(() => {
      this.listeners =
        this.listeners.filter((listener) => !listener.removeNextCall) ?? [];

      const currentTimeMs = new Date().getTime();
      this.listeners.forEach((listener) => {
        listener.callback(
          currentTimeMs - listener.initialMs,
          listener.remove.bind(listener)
        );
      });
    });
  }

  private generateRectangles(n: number): Rectangle[] {
    return new Array(n).fill(0).map((_, i) => {
      const rec = this.two.makeRectangle(
        this.two.width / 2 + i * 50,
        this.two.height / 2,
        50,
        50
      );
      rec.linewidth = 2;
      const text = new Two.Text(
        i.toString(),
        this.two.width / 2 + i * 50,
        this.two.height / 2,
        {}
      );
      this.two.scene.add(text);
      return Object.assign(rec, { index: i, text });
    });
  }

  changeColor(i: number, color: string): void {
    this.rectangles[i].fill = color;
  }

  swapElements(i1: number, i2: number): void {
    let lastMs = 0;
    const first = this.rectangles[i1];
    const second = this.rectangles[i2];
    const firstX = first.translation.x;
    const secondX = second.translation.x;
    const lengthBetween = Math.abs(firstX - secondX);
    const lengthPrMs = lengthBetween / Duration.SWAP;

    this.listeners.push(
      new Listener((ms, remove) => {
        const diffMs = Math.abs(lastMs - ms);
        const travel = diffMs * lengthPrMs;

        first.translation.x += travel;
        first.text.translation.x += travel;
        second.translation.x -= travel;
        second.text.translation.x -= travel;

        if (ms > Duration.SWAP) {
          first.translation.x = secondX;
          second.translation.x = firstX;
          remove();
        }

        lastMs = ms;
      })
    );
  }
}
