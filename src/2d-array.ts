import * as Two from "twojs-ts";
import { Alvis } from "./alvis";

enum Duration {
  SWAP = 500,
}

interface Rectangle extends Two.Rectangl {
  index: number;
  text: Two.Text;
}

class Cell {
  private rectangle: Rectangle | null = null;

  constructor(
    two: Two,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ) {
    const rec = two.makeRectangle(x, y, width, height);
    const text_ = new Two.Text(text, x, y, {});
    two.scene.add(text_);
    this.rectangle = Object.assign(rec, { index: 0, text: text_ });
  }

  set x(x: number) {
    if (this.rectangle) {
      this.rectangle.translation.x = x;
      this.rectangle.text.translation.x = x;
    }
  }

  set y(y: number) {
    if (this.rectangle) {
      this.rectangle.translation.y = y;
      this.rectangle.text.translation.y = y;
    }
  }

  get x() {
    if (this.rectangle) {
      return this.rectangle.translation.x;
    } else return -1;
  }

  get y() {
    if (this.rectangle) {
      return this.rectangle.translation.y;
    } else return -1;
  }

  set style({ color, strokeWidth }: { color: string; strokeWidth: string }) {}

  displayOnTop() {}
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
  private cells: Cell[] = [];
  private listeners: Listener[] = [];

  constructor() {
    super();
    this.cells = this.generateCells(5);
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

  private generateCells(n: number): Cell[] {
    return new Array(n).fill(0).map((_, i) => {
      return new Cell(
        this.two,
        this.two.width / 2 + i * 50,
        this.two.height / 2,
        50,
        50,
        i.toString()
      );
    });
  }

  changeColor(i: number, color: string): void {
    // this.cells[i].fill = color;
  }

  swapElements(i1: number, i2: number): void {
    let lastMs = 0;
    const first = this.cells[i1];
    const second = this.cells[i2];
    const firstX = first.x;
    const secondX = second.x;
    const lengthBetween = Math.abs(firstX - secondX);
    const lengthPrMs = lengthBetween / Duration.SWAP;

    this.listeners.push(
      new Listener((ms, remove) => {
        const diffMs = Math.abs(lastMs - ms);
        const travel = diffMs * lengthPrMs;

        first.x += travel;
        second.x -= travel;

        if (ms > Duration.SWAP) {
          first.x = secondX;
          second.x = firstX;
          remove();
        }

        lastMs = ms;
      })
    );
  }
}
