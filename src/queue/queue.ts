import { Cell, CellStyle } from "../array/cell";
import { Colors } from "../common/colors";
import { Movements } from "../common/movements";
import { timeout } from "../util";

enum Default {
  CELL_WIDTH = 75,
  CELL_MAX_AMOUNT = 8,
}

interface Style_ {
  cellWidth: number;
  cellMaxAmount: number;
}
type Style = Partial<Style_>;

type AllStyles = Style & CellStyle;
type AllStylesRequired = Required<Style> & CellStyle;

export class Queue<T extends { text: string } | string> extends Colors {
  public actualArray: T[] = [];
  private cells: Cell[] = [];
  private style: AllStylesRequired;
  private xOffset = 0;
  private yOffset = 0;

  constructor(element: HTMLElement, values: T[], style: AllStyles = {}) {
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

  private getText(input: T) {
    if (typeof input === "string") {
      return input;
    }
    return input.text;
  }

  private generateCells(values: T[]): Cell[] {
    return values.map((value, i) => {
      return new Cell(
        this.two,
        this.xOffset + (i + 1) * this.style.cellWidth,
        this.yOffset,
        this.style.cellWidth,
        this.style.cellWidth,
        this.getText(value),
        this.style
      );
    });
  }

  wait(ms: number): Promise<void> {
    return timeout(ms);
  }

  get length() {
    return this.actualArray.length;
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

  set nextToDequeueColor(color: string) {
    this.cells[0].color = color;
  }

  getNextToDequeue() {
    return this.actualArray[0];
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

  async remove(i: number) {
    console.log(
      this.cells.slice(i, this.actualArray.length).map((el, i_) => i_ + i)
    );

    await this.fadeOut(i, 500);
    await Promise.all(
      this.cells
        .slice(i, this.actualArray.length)
        .map((_, i_) => this.moveLeftOneBlock(i_ + i, 1000))
    );

    this.actualArray = this.actualArray.filter(
      (value) => value !== this.actualArray[i]
    );
    this.cells = this.cells.filter((value) => value !== this.cells[i]);
  }

  async enqueue(value: T, duration = 500, style?: { color: string }) {
    this.actualArray.push(value);
    const cell = new Cell(
      this.two,
      this.xOffset + (this.cells.length + 2) * this.style.cellWidth,
      this.yOffset,
      this.style.cellWidth,
      this.style.cellWidth,
      this.getText(value),
      this.style
    );
    if (style) cell.color = style.color;
    this.cells.push(cell);
    this.fadeOut(this.cells.length - 1, 0);
    return await Promise.all([
      this.fadeIn(this.cells.length - 1, duration * 0.9),
      this.moveLeftOneBlock(this.cells.length - 1, duration),
    ]);
  }

  private updateCanvasSize() {
    this.canvasWidth = (this.style.cellMaxAmount + 3) * this.style.cellWidth;
    this.canvasHeight = this.style.cellWidth + 1;
  }
}
