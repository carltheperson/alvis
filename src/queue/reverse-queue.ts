import { Cell, CellStyle } from "../array/cell";
import { Colors } from "../common/colors";
import { Movements } from "../common/movements";

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

export class ReverseQueue<T extends { text: string }> extends Colors {
  public actualArray: T[] = [];
  private cells: Cell[] = [];
  private style: AllStylesRequired;

  constructor(element: HTMLElement, values: T[], style: AllStyles = {}) {
    super(element);

    this.style = {
      ...style,
      cellWidth: style.cellWidth ?? Default.CELL_WIDTH,
      cellMaxAmount: style.cellMaxAmount ?? Default.CELL_MAX_AMOUNT,
    };

    this.actualArray = values;
    this.cells = [];
    this.entities = this.cells;
    this.updateCanvasSize();
  }

  async enqueue(value: T, duration = 600, style?: { color: string }) {
    this.actualArray.unshift(value);
    const cell = new Cell(
      this.two,
      (this.style.cellMaxAmount - this.actualArray.length + 2) *
        this.style.cellWidth,
      this.style.cellWidth / 2 + 1,
      this.style.cellWidth,
      this.style.cellWidth,
      value.text,
      this.style
    );
    if (style) cell.color = style.color;
    this.cells.unshift(cell);
    await Movements.fadeOut(cell, 0, super.getEventPromise.bind(this));
    Movements.fadeIn(cell, duration - 50, super.getEventPromise.bind(this));
    await Movements.moveRight(
      cell,
      this.style.cellWidth,
      duration,
      super.getEventPromise.bind(this)
    );
  }

  private updateCanvasSize() {
    this.canvasWidth = (this.style.cellMaxAmount + 3) * this.style.cellWidth;
    this.canvasHeight = this.style.cellWidth + 1;
  }
}
