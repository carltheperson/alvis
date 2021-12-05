import { Alvis } from "../alvis";
import { timeout } from "../util";

interface Entity {
  color: string;
}

export class Colors2D extends Alvis {
  entities: Entity[][] = [];

  constructor(element: HTMLElement) {
    super(element);
  }

  changeColor(i: number, j: number, color: string, duration = 0) {
    this.entities[i][j].color = color;
    return timeout(duration);
  }

  changeColorForRow(i: number, color: string, duration = 0) {
    this.entities[i].forEach((entity) => (entity.color = color));
    return timeout(duration);
  }

  changeColorForColumn(j: number, color: string, duration = 0) {
    this.entities.forEach((entity) => (entity[j].color = color));
    return timeout(duration);
  }
}
