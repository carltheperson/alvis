import { Colors } from "../common/colors";
import { Movements } from "../common/movements";
import { calculateXOffset, calculateYOffset, timeout } from "../util";
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

export class Array1D extends Colors {
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

    this.yOffset = this.style.cellWidth / 2 + 1;
    this.xOffset = this.style.cellWidth / 2 + 1;

    this.actualArray = values;
    this.cells = this.generateCells(values);
    super.entities = this.cells;

    this.updateCanvasSize();
  }

  private generateCells(values: string[] | number[]): Cell[] {
    return values.map((value, i) => {
      return new Cell(
        this.two,
        this.xOffset + i * this.style.cellWidth,
        this.yOffset,
        this.style.cellWidth,
        this.style.cellWidth,
        value.toString(),
        this.style ?? {}
      );
    });
  }

  wait(ms: number): Promise<void> {
    return timeout(ms);
  }

  swapElements(i1: number, i2: number, duration = 0): Promise<void> {
    return Movements.swapElements({
      i1,
      i2,
      duration,
      actualArray: this.actualArray,
      entities: this.cells,
      getEventPromise: super.getEventPromise.bind(this),
      getXOffset: () => this.xOffset,
    });
  }

  private updateCanvasSize() {
    this.canvasWidth = this.style.cellWidth * this.actualArray.length + 1;
    this.canvasHeight = this.style.cellWidth + 1;
  }
}
