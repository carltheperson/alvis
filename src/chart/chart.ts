import { Alvis } from "../alvis";
import { Bar } from "./bar";

interface Style {
  barWidth?: number;
  barMaxHeight?: number;
  barMinHeight?: number;
}

export class Chart extends Alvis {
  private bars: Bar[] = [];

  constructor(element: HTMLElement, values: string[] | number[], style: Style) {
    super(element);
  }
}
