import { calculateXOffset, calculateYOffset } from "../util";
import { Movements } from "../common/movements";
import { Bar } from "./bar";
import { Colors } from "../common/colors";

enum Default {
  BAR_WIDTH = 50,
  BAR_MAX_HEIGHT = 500,
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

export class Chart extends Colors {
  private bars: Bar[] = [];
  private actualArray: number[] = [];
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
    this.actualArray = values;
    this.bars = this.generateBars(values);
    super.entities = this.bars;

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
    this.yOffset = calculateYOffset(this.style.barMaxHeight, this.two.height);
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
    return (
      (normalizedValue / normalizedMax) *
        (this.style.barMaxHeight - this.style.barMinHeight) +
      this.style.barMinHeight
    );
  }

  wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  swapElements(i1: number, i2: number, duration = 0): Promise<void> {
    return Movements.swapElements({
      i1,
      i2,
      duration,
      actualArray: this.actualArray,
      entities: this.bars,
      getEventPromise: super.getEventPromise.bind(this),
      getXOffset: () => this.xOffset,
    });
  }
}
