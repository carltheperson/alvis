import { Alvis } from "../alvis";
import { calculateXOffset, calculateYOffset } from "../util";
import { Cell, CellStyle } from "./cell";

enum Default {
  CELL_WIDTH = 100,
}

interface Style_ {
  cellWidth: number;
}
type Style = Partial<Style_>;

type AllStyles = Style & CellStyle;
type AllStylesRequired = Required<Style> & CellStyle;

export class Array1D extends Alvis {
  private cells: Cell[] = [];
  private actualArray: string[] | number[] = [];
  private style: AllStylesRequired;
  private xOffset = 0;
  private yOffset = 0;

  constructor(
    element: HTMLElement,
    values: string[] | number[],
    style: AllStyles = {}
  ) {
    super(element);
    this.style = {
      ...style,
      cellWidth: style.cellWidth ?? Default.CELL_WIDTH,
    };

    this.actualArray = values;
    this.updateOffsets(values.length);
    this.cells = this.generateCells(values);

    super.bindResizeCallback(() => {
      this.updateOffsets(this.cells.length);
    });
  }

  private updateOffsets(cellAmount: number) {
    const lastXOffset = this.xOffset;
    const lastYOffset = this.yOffset;
    this.xOffset = calculateXOffset(
      cellAmount,
      this.style.cellWidth,
      this.two.width
    );
    this.yOffset = calculateYOffset(this.style.cellWidth, this.two.height);
    this.cells.forEach((cell) => {
      cell.x += this.xOffset - lastXOffset;
      cell.y += this.yOffset - lastYOffset;
    });
  }

  private generateCells(values: string[] | number[]): Cell[] {
    return new Array(values.length).fill(0).map((_, i) => {
      return new Cell(
        this.two,
        this.xOffset + i * this.style.cellWidth,
        this.yOffset,
        this.style.cellWidth,
        values[i].toString(),
        this.style ?? {}
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
    return super.getEventPromise((ms, next) => {
      this.cells[i].color = color;
      if (ms > duration) {
        next();
      }
    });
  }

  changeColors(indexes: number[], color: string, duration = 0): Promise<void> {
    return super.getEventPromise((ms, next) => {
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
    const indexes = new Array(this.actualArray.length)
      .fill(0)
      .map((_, i) => i)
      .filter((i) => i >= startI && i <= endI);
    this.changeColors(indexes, color, duration);
  }

  changeAllColors(color: string, duration = 0): Promise<void> {
    return super.getEventPromise((ms, next) => {
      this.cells.forEach((cell) => (cell.color = color));
      if (ms > duration) {
        next();
      }
    });
  }

  swapElements(i1: number, i2: number, duration = 0): Promise<void> {
    // Actual swap
    const temp = this.actualArray[i1];
    this.actualArray[i1] = this.actualArray[i2];
    this.actualArray[i2] = temp;

    this.cells[i1].displayOnTop();
    this.cells[i2].displayOnTop();
    let lastMs = 0;
    const firstOffset = this.xOffset;
    const first = this.cells[i1];
    const second = this.cells[i2];
    const firstX = first.x;
    const secondX = second.x;
    const lengthBetween = Math.abs(first.x - second.x);

    return super.getEventPromise((ms, next) => {
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
