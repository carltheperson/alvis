import { Node } from "./node";
import * as Two from "twojs-ts";
import {
  convertVectorToRadians,
  convertVectorToUnitVector,
  rotate,
} from "../util";

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
  private arrowLines: Two.Line[];
  private style: Required<EdgeStyle>;
  private two: Two;
  public node: Node;

  constructor(
    two: Two,
    node: Node,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    style: EdgeStyle = {}
  ) {
    this.two = two;
    this.node = node;
    const newStyle = {
      lineColor: style.lineColor ?? Default.LINE_COLOR,
      lineWidth: style.lineWidth ?? Default.LINE_WIDTH,
    };
    this.style = newStyle;

    this.line = this.two.makeLine(x1, y1, x2, y2);
    this.arrowLines = this.generateArrowLines(x1, y1, x2, y2);
    this.line.linewidth = newStyle.lineWidth;
    this.line.fill = newStyle.lineColor;
  }

  private generateArrowLines(x1: number, y1: number, x2: number, y2: number) {
    const unitVec = convertVectorToUnitVector({ x: x1 - x2, y: y1 - y2 });
    const angle = convertVectorToRadians(unitVec);

    const rotatedPoint1 = rotate(x2, y2, x2 + 15, y2 + 15, angle);
    const rotatedPoint2 = rotate(x2, y2, x2 - 15, y2 + 15, angle);
    const lines = [
      this.two.makeLine(x2, y2, rotatedPoint1.x, rotatedPoint1.y),
      this.two.makeLine(x2, y2, rotatedPoint2.x, rotatedPoint2.y),
    ];
    lines.forEach((line) => (line.linewidth = this.style.lineWidth - 0.5));
    return lines;
  }
}
