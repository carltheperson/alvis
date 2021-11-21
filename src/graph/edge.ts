import * as Two from "twojs-ts";

enum Default {
  LINE_WIDTH = 3,
  LINE_COLOR = "black",
}

export interface EdgeStyle {
  lineWidth?: number;
  lineColor?: string;
}

export class Edge {
  private line: Two.Line;
  private two: Two;

  constructor(
    two: Two,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    style: EdgeStyle = {}
  ) {
    this.two = two;
    const newStyle = {
      lineColor: style.lineColor ?? Default.LINE_COLOR,
      lineWidth: style.lineWidth ?? Default.LINE_WIDTH,
    };

    this.line = this.two.makeLine(x1, y1, x2, y2);
    this.line.linewidth = newStyle.lineWidth;
    this.line.fill = newStyle.lineColor;
  }
}
