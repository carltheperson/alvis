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
  private two: Two | null = null;

  constructor(
    two: Two,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ) {
    this.two = two;
    const rec = two.makeRectangle(x, y, width, height);
    rec.linewidth = 2;
    const text_ = new Two.Text(text, x, y, { size: 18, weight: 800 });
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

  set width(n: number) {
    if (this.rectangle) this.rectangle;
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

  set color(color: string) {
    if (this.rectangle && color) this.rectangle.fill = color;
  }

  set strokeWidth(strokeWidth: number) {
    if (this.rectangle && strokeWidth) this.rectangle.linewidth = strokeWidth;
  }

  displayOnTop() {
    const recClone = this.rectangle?.clone();
    const textClone = this.rectangle?.text?.clone();
    this.removeGraphicalElement();
    this.rectangle = Object.assign(recClone, {
      index: this.rectangle?.index,
      text: textClone,
    });
  }

  removeGraphicalElement() {
    this.rectangle?.remove();
    this.two?.scene.remove(this.rectangle?.text);
  }
}

type EventCallBack = (ms: number, next: () => void) => void;

class Event {
  removeNextCall = false;
  initialMs = 0;
  callback: EventCallBack = () => {};

  constructor(callback: EventCallBack) {
    this.callback = callback;
  }

  next(): void {
    this.removeNextCall = true;
  }
}

export class Array2D extends Alvis {
  private cells: Cell[] = [];
  private events: Event[] = [];
  private originalArray: string[] | number[] = [];
  private xOffset = 0;
  private yOffset = 0;
  private cellWidth = 0;

  constructor(
    element: HTMLElement,
    values: string[] | number[],
    cellWidth = 50
  ) {
    super(element);

    this.cellWidth = cellWidth;
    this.originalArray = values;
    this.updateOffsets(values.length);
    this.cells = this.generateCells(values);

    super.bindUpdateCallback(() => {
      this.events =
        this.events.filter((listener) => !listener.removeNextCall) ?? [];

      const currentTimeMs = new Date().getTime();
      if (this.events[0]) {
        if (this.events[0].initialMs === 0) {
          this.events[0].initialMs = currentTimeMs;
        }

        this.events[0].callback(
          currentTimeMs - this.events[0].initialMs,
          this.events[0].next.bind(this.events[0])
        );
      }
    });

    super.bindResizeCallback((width, height) => {
      this.updateOffsets(this.cells.length);
    });
  }

  private updateOffsets(cellAmount: number) {
    const lastXOffset = this.xOffset;
    const lastYOffset = this.yOffset;
    this.xOffset = this.two.width / 2 - ((cellAmount - 1) * this.cellWidth) / 2;
    this.yOffset = this.two.height / 2 - this.cellWidth / 2;
    this.cells.forEach((cell) => {
      cell.x += this.xOffset - lastXOffset;
      cell.y += this.yOffset - lastYOffset;
    });
  }

  private generateCells(values: string[] | number[]): Cell[] {
    return new Array(values.length).fill(0).map((_, i) => {
      return new Cell(
        this.two,
        this.xOffset + i * this.cellWidth,
        this.yOffset,
        this.cellWidth,
        this.cellWidth,
        values[i].toString()
      );
    });
  }

  wait(ms: number) {
    this.events.push(
      new Event((_, next) => {
        setTimeout(() => {
          next();
        }, ms);
      })
    );
  }

  changeColor(i: number, color: string, duration = 0): void {
    this.events.push(
      new Event((ms, next) => {
        this.cells[i].color = color;
        if (ms > duration) {
          next();
        }
      })
    );
  }

  changeColors(indexes: number[], color: string, duration = 0) {
    this.events.push(
      new Event((ms, next) => {
        indexes.forEach((i) => (this.cells[i].color = color));
        if (ms > duration) {
          next();
        }
      })
    );
  }

  changeColorsInRange(
    startI: number,
    endI: number,
    color: string,
    duration = 0
  ) {
    const indexes = new Array(this.originalArray.length)
      .fill(0)
      .map((_, i) => i)
      .filter((i) => i >= startI && i <= endI);
    this.changeColors(indexes, color, duration);
  }

  changeAllColors(color: string, duration = 0) {
    this.events.push(
      new Event((ms, next) => {
        this.cells.forEach((cell) => (cell.color = color));
        if (ms > duration) {
          next();
        }
      })
    );
  }

  swapElements(i1: number, i2: number): void {
    // Actual swap
    const temp = this.originalArray[i1];
    this.originalArray[i1] = this.originalArray[i2];
    this.originalArray[i2] = temp;

    this.cells[i1].displayOnTop();
    this.cells[i2].displayOnTop();
    let lastMs = 0;
    const firstOffset = this.xOffset;
    const first = this.cells[i1];
    const second = this.cells[i2];
    const firstX = first.x;
    const secondX = second.x;
    const lengthBetween = Math.abs(first.x - second.x);

    this.events.push(
      new Event((ms, next) => {
        const first = this.cells[i1];
        const second = this.cells[i2];
        const lengthPrMs = lengthBetween / Duration.SWAP;

        const diffMs = Math.abs(lastMs - ms);
        const travel = diffMs * lengthPrMs;

        first.x += travel;
        second.x -= travel;

        if (ms > Duration.SWAP) {
          first.x = secondX - (firstOffset - this.xOffset);
          second.x = firstX - (firstOffset - this.xOffset);
          const temp = this.cells[i1];
          this.cells[i1] = this.cells[i2];
          this.cells[i2] = temp;
          next();
        }

        lastMs = ms;
      })
    );
  }
}
