import { Cell, CellStyle } from "../array/cell";
import { Colors } from "../common/colors";
import { Movements } from "../common/movements";
import { timeout } from "../util";

enum Default {
  CELL_WIDTH = 100,
  CELL_MAX_AMOUNT = 8,
}

interface Style_ {
  cellWidth: number;
  cellMaxAmount: number;
}
type Style = Partial<Style_>;

type AllStyles = Style & CellStyle;
type AllStylesRequired = Required<Style> & CellStyle;

export class Queue extends Colors {
  private cells: Cell[] = [];
  private actualArray: string[] = [];
  private style: AllStylesRequired;
  private xOffset = 0;
  private yOffset = 0;

  constructor(element: HTMLElement, values: string[], style: AllStyles = {}) {
    super(element);
    this.style = {
      ...style,
      cellWidth: style.cellWidth ?? Default.CELL_WIDTH,
      cellMaxAmount: style.cellMaxAmount ?? Default.CELL_MAX_AMOUNT,
    };

    this.actualArray = values;
    this.xOffset = this.style.cellWidth / 2 + 1;
    this.yOffset = this.style.cellWidth / 2 + 1;
    this.cells = this.generateCells(values);
    super.entities = this.cells;
    this.updateCanvasSize();
  }

  private generateCells(values: string[]): Cell[] {
    return values.map((value, i) => {
      return new Cell(
        this.two,
        this.xOffset + (i + 1) * this.style.cellWidth,
        this.yOffset,
        this.style.cellWidth,
        this.style.cellWidth,
        value,
        this.style
      );
    });
  }

  wait(ms: number): Promise<void> {
    return timeout(ms);
  }

  private fadeOut(i: number, duration = 0) {
    return Movements.fadeOut(
      this.cells[i],
      duration,
      super.getEventPromise.bind(this)
    );
  }

  private fadeIn(i: number, duration = 0) {
    return Movements.fadeIn(
      this.cells[i],
      duration,
      super.getEventPromise.bind(this)
    );
  }

  private moveLeftOneBlock(i: number, duration = 0) {
    return Movements.moveLeft(
      this.cells[i],
      this.style.cellWidth,
      duration,
      () => this.xOffset,
      super.getEventPromise.bind(this)
    );
  }

  async dequeue(duration = 500) {
    const value = this.actualArray[0];

    await Promise.all([
      this.fadeOut(0, duration),
      ...this.actualArray.map((_, i) => this.moveLeftOneBlock(i, duration)),
    ]);

    this.actualArray.shift();
    this.cells.shift();
    return value;
  }

  async enqueue(value: string, duration = 500) {
    this.actualArray.push(value);
    this.cells.push(
      new Cell(
        this.two,
        this.xOffset + (this.cells.length + 1) * this.style.cellWidth,
        this.yOffset,
        this.style.cellWidth,
        this.style.cellWidth,
        value,
        this.style
      )
    );
    this.fadeOut(this.cells.length - 1, 0);
    return await Promise.all([
      this.fadeIn(this.cells.length - 1, duration * 0.9),
      this.moveLeftOneBlock(this.cells.length - 1, duration),
    ]);
  }

  private updateCanvasSize() {
    this.canvasWidth = (this.style.cellMaxAmount + 1) * this.style.cellWidth;
    this.canvasHeight = this.style.cellWidth;
  }
}
