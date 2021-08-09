import { EventCallBack } from "../event";

interface Entity {
  x: number;
  y: number;
  displayOnTop: () => void;
}

export class Movements {
  public static swapElements({
    i1,
    i2,
    actualArray,
    getEventPromise,
    duration,
    entities,
    getXOffset,
  }: {
    i1: number;
    i2: number;
    actualArray: string[] | number[];
    entities: Entity[];
    getXOffset: () => number;
    duration: number;
    getEventPromise: (callback: EventCallBack) => Promise<void>;
  }): Promise<void> {
    // Actual swap
    const temp = actualArray[i1];
    actualArray[i1] = actualArray[i2];
    actualArray[i2] = temp;

    const xOffset = getXOffset();

    entities[i1].displayOnTop();
    entities[i2].displayOnTop();
    let lastMs = 0;
    const firstOffset = xOffset;
    const first = entities[i1];
    const second = entities[i2];
    const firstX = first.x;
    const secondX = second.x;
    const lengthBetween = Math.abs(first.x - second.x);

    return getEventPromise((ms, next) => {
      const xOffset = getXOffset();

      const first = entities[i1];
      const second = entities[i2];
      const lengthPrMs = lengthBetween / duration;

      const diffMs = Math.abs(lastMs - ms);
      const travel = diffMs * lengthPrMs;

      first.x += travel;
      second.x -= travel;

      if (ms > duration) {
        first.x = secondX - (firstOffset - xOffset);
        second.x = firstX - (firstOffset - xOffset);
        const temp = entities[i1];
        entities[i1] = entities[i2];
        entities[i2] = temp;
        next();
      }

      lastMs = ms;
    });
  }
}
