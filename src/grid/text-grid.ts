import { Cell, CellStyle } from "../array/cell";
import { Colors2D } from "../common/colors2d";

enum Default {
  CELL_WIDTH = 100,
  CELL_HEIGHT = 50,
}

interface Style_ {
  cellWidth: number;
  cellHeight: number;
}
type Style = Partial<Style_>;

type AllStyles = Style & CellStyle;
type AllStylesRequired = Required<Style> & CellStyle;

export class TextGrid extends Colors2D {
  private cells: Cell[][] = [];
  private style: AllStylesRequired;

  constructor(element: HTMLElement, values: string[][], style: AllStyles = {}) {
    super(element);
    this.style = {
      ...style,
      cellWidth: style.cellWidth ?? Default.CELL_WIDTH,
      cellHeight: style.cellHeight ?? Default.CELL_HEIGHT,
    };
    this.cells = this.generateCells(values);
    this.entities = this.cells;
  }

  private generateCells1d(values: string[], extraYOffset: number) {
    return values.map((value, i) => {
      return new Cell(
        this.two,
        i * this.style.cellWidth + this.style.cellWidth / 2 + 1,
        extraYOffset + this.style.cellHeight / 2 + 1,
        this.style.cellWidth,
        this.style.cellHeight,
        value,
        this.style ?? {}
      );
    });
  }

  private generateCells(values: string[][]) {
    return values.map((values_, i) => {
      return this.generateCells1d(values_, i * this.style.cellHeight);
    });
  }
}
