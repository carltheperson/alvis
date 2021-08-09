import { Alvis } from "../alvis";

interface Entity {
  color: string;
}

export class Colors extends Alvis {
  private allEntities: Entity[] = [];

  constructor(element: HTMLElement) {
    super(element);
  }

  set entities(entities: Entity[]) {
    this.allEntities = entities;
  }

  changeColor(i: number, color: string, duration = 0): Promise<void> {
    return super.getEventPromise((ms, next) => {
      this.allEntities[i].color = color;
      if (ms > duration) {
        next();
      }
    });
  }

  changeColors(indexes: number[], color: string, duration = 0): Promise<void> {
    return super.getEventPromise((ms, next) => {
      indexes.forEach((i) => (this.allEntities[i].color = color));
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
    const indexes = new Array(this.allEntities.length)
      .fill(0)
      .map((_, i) => i)
      .filter((i) => i >= startI && i <= endI);
    this.changeColors(indexes, color, duration);
  }

  changeAllColors(color: string, duration = 0): Promise<void> {
    return super.getEventPromise((ms, next) => {
      this.allEntities.forEach((cell) => (cell.color = color));
      if (ms > duration) {
        next();
      }
    });
  }
}
