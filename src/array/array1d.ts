import { Alvis } from "../alvis";
import { Cell, CellStyle } from "./cell";
import { Event, EventCallBack } from "./event";

enum Default {
  CELL_WIDTH = 100,
}

interface Style extends CellStyle {
  cellWidth?: number;
}

export class Array1D extends Alvis {
  private cells: Cell[] = [];
  private events: Event[] = [];
  private originalArray: string[] | number[] = [];
  private style: Style = {};
  private xOffset = 0;
  private yOffset = 0;
  private cellWidth = 0;

  constructor(element: HTMLElement, values: string[] | number[], style: Style) {
    super(element);

    this.style = style;
    const newStyle = {
      cellWidth: style.cellWidth ?? Default.CELL_WIDTH,
    };

    this.cellWidth = newStyle.cellWidth;
    this.originalArray = values;
    this.updateOffsets(values.length);
    this.cells = this.generateCells(values);

    super.bindUpdateCallback(() => {
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

    super.bindResizeCallback(() => {
      this.updateOffsets(this.cells.length);
    });
  }

  private getEventPromise(callback: EventCallBack) {
    return new Promise<void>((resolve) => {
      this.events.push(new Event(callback, () => resolve()));
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
        values[i].toString(),
        this.style
      );
    });
  }

  wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  changeColor(i: number, color: string, duration = 0): Promise<void> {
    return this.getEventPromise((ms, next) => {
      this.cells[i].color = color;
      if (ms > duration) {
        next();
      }
    });
  }

  changeColors(indexes: number[], color: string, duration = 0): Promise<void> {
    return this.getEventPromise((ms, next) => {
      indexes.forEach((i) => (this.cells[i].color = color));
      if (ms > duration) {
        next();
      }
    });
  }

  changeColorsInRange(
    startI: number,
    endI: number,
    color: string,
    duration = 0
  ): void {
    const indexes = new Array(this.originalArray.length)
      .fill(0)
      .map((_, i) => i)
      .filter((i) => i >= startI && i <= endI);
    this.changeColors(indexes, color, duration);
  }

  changeAllColors(color: string, duration = 0): Promise<void> {
    return this.getEventPromise((ms, next) => {
      this.cells.forEach((cell) => (cell.color = color));
      if (ms > duration) {
        next();
      }
    });
  }

  swapElements(i1: number, i2: number, duration = 0): Promise<void> {
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

    return this.getEventPromise((ms, next) => {
      const first = this.cells[i1];
      const second = this.cells[i2];
      const lengthPrMs = lengthBetween / duration;

      const diffMs = Math.abs(lastMs - ms);
      const travel = diffMs * lengthPrMs;

      first.x += travel;
      second.x -= travel;

      if (ms > duration) {
        first.x = secondX - (firstOffset - this.xOffset);
        second.x = firstX - (firstOffset - this.xOffset);
        const temp = this.cells[i1];
        this.cells[i1] = this.cells[i2];
        this.cells[i2] = temp;
        next();
      }

      lastMs = ms;
    });
  }
}
