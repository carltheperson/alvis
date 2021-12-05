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
    this.updateCanvasSize();
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
        this.style
      );
    });
  }

  private generateCells(values: string[][]) {
    return values.map((values_, i) => {
      return this.generateCells1d(values_, i * this.style.cellHeight);
    });
  }

  private updateCanvasSize() {
    this.canvasWidth = this.style.cellWidth * this.cells[0].length + 1;
    this.canvasHeight = this.style.cellHeight * this.cells.length + 1;
  }

  setText(i: number, j: number, text: string) {
    this.cells[i][j].text = text;
  }

  getText(i: number, j: number) {
    return this.cells[i][j].text;
  }

  getAllTextValues(): string[][] {
    return this.cells.map((cells) => cells.map((cell) => cell.text));
  }

  updateText(oldText: string, newText: string) {
    this.cells.forEach((cells) =>
      cells.forEach((cell) => {
        if (cell.text === oldText) {
          cell.text = newText;
        }
      })
    );
  }
}
