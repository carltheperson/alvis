import { Alvis } from "../alvis";
import { timeout } from "../util";
import { Colors } from "./colors";

interface Entity {
  color: string;
}

export class Colors2D extends Alvis {
  private allEntities: Entity[][] = [];
  private colors: Colors[] = [];

  constructor(element: HTMLElement) {
    super(element);
  }

  set entities(entities: Entity[][]) {
    this.allEntities = entities;
    this.colors = this.allEntities.map((entities) => {
      const colors = new Colors(this.htmlElement);
      colors.entities = entities;
      return colors;
    });
  }

  changeColor(i: number, j: number, color: string, duration = 0) {
    return this.colors[i].changeColor(j, color, duration);
  }

  changeColorForRow(i: number, color: string, duration = 0) {
    return this.colors[i].changeAllColors(color, duration);
  }

  async changeColorForColumn(j: number, color: string, duration = 0) {
    this.colors.forEach((colors) => {
      colors.changeColor(j, color);
    });
    await timeout(duration);
  }
}
