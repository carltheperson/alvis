import { Alvis } from "../alvis";
import { calculateXOffset, calculateYOffset } from "../util";
import { Bar } from "./bar";

enum Default {
  BAR_WIDTH = 50,
  BAR_MAX_HEIGHT = 300,
  BAR_MIN_HEIGHT = 50,
}

interface Style_ {
  barWidth: number;
  barMaxHeight: number;
  barMinHeight: number;
}
type Style = Partial<Style_>;

type AllStyles = Style;
type AllStylesRequired = Required<Style>;

export class Chart extends Alvis {
  private bars: Bar[] = [];
  private style: AllStylesRequired;
  private xOffset = 0;
  private yOffset = 0;

  constructor(element: HTMLElement, values: number[], style: AllStyles = {}) {
    super(element);
    this.style = {
      ...style,
      barWidth: style.barWidth ?? Default.BAR_WIDTH,
      barMaxHeight: style.barMaxHeight ?? Default.BAR_MAX_HEIGHT,
      barMinHeight: style.barMinHeight ?? Default.BAR_MIN_HEIGHT,
    };

    this.updateOffsets(values.length);
    this.bars = this.generateBars(values);

    super.bindResizeCallback(() => {
      this.updateOffsets(this.bars.length);
    });
  }

  private generateBars(values: number[]): Bar[] {
    const maxHeight = this.getBarHeight(
      values,
      values.indexOf(Math.max(...values))
    );
    return new Array(values.length).fill(0).map((_, i) => {
      const height = this.getBarHeight(values, i);
      return new Bar(
        this.two,
        this.xOffset + i * this.style.barWidth,
        this.yOffset + maxHeight - height / 2,
        this.style.barWidth,
        height
      );
    });
  }

  private updateOffsets(cellAmount: number) {
    const lastXOffset = this.xOffset;
    const lastYOffset = this.yOffset;
    this.xOffset = calculateXOffset(
      cellAmount,
      this.style.barWidth,
      this.two.width
    );
    this.yOffset = calculateYOffset(this.style.barWidth, this.two.height);
    this.bars.forEach((bar) => {
      bar.x += this.xOffset - lastXOffset;
      bar.y += this.yOffset - lastYOffset;
    });
  }

  private getBarHeight(values: number[], index: number) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const normalizedMax = max - min;
    const normalizedValue = values[index] - min;
    return (normalizedMax / normalizedValue) * normalizedMax;
  }
}
