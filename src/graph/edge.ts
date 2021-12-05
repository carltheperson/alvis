import { Node } from "./node";
import * as Two from "twojs-ts";
import {
  convertVectorToRadians,
  convertVectorToUnitVector,
  getDistanceBetweenPoints,
  rotate,
} from "../util";

enum Default {
  LINE_WIDTH = 3,
  LINE_COLOR = "black",
  WEIGHT_REC_WIDTH = 25,
  WEIGHT_FONT_SIZE = 14,
}

export interface EdgeStyle {
  lineWidth?: number;
  lineColor?: string;
  weightRecWidth?: number;
  weightFontSize?: number;
}

export class Edge {
  private line: Two.Line;
  private arrowLines: Two.Line[];
  private style: Required<EdgeStyle>;
  private weightRec: Two.Rectangl | null = null;
  private weightText: Two.Text | null = null;
  private two: Two;
  public node: Node;
  public weight: number;

  constructor(
    two: Two,
    node: Node,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    style: EdgeStyle = {},
    weight?: number
  ) {
    this.two = two;
    this.node = node;
    const newStyle: Required<EdgeStyle> = {
      lineColor: style.lineColor ?? Default.LINE_COLOR,
      lineWidth: style.lineWidth ?? Default.LINE_WIDTH,
      weightFontSize: style.weightFontSize ?? Default.WEIGHT_FONT_SIZE,
      weightRecWidth: style.weightRecWidth ?? Default.WEIGHT_REC_WIDTH,
    };
    this.style = newStyle;

    this.line = this.two.makeLine(x1, y1, x2, y2);
    this.arrowLines = this.generateArrowLines(x1, y1, x2, y2);
    this.line.linewidth = newStyle.lineWidth;
    this.line.fill = newStyle.lineColor;

    this.weight = weight ?? 0;
    if (weight) this.drawWeight(x1, y1, x2, y2);
  }

  private generateArrowLines(x1: number, y1: number, x2: number, y2: number) {
    const unitVec = convertVectorToUnitVector({ x: x1 - x2, y: y1 - y2 });
    const angle = convertVectorToRadians(unitVec);

    const rotatedPoint1 = rotate(x2, y2, x2 + 10, y2 + 10, angle);
    const rotatedPoint2 = rotate(x2, y2, x2 - 10, y2 + 10, angle);
    const lines = [
      this.two.makeLine(x2, y2, rotatedPoint1.x, rotatedPoint1.y),
      this.two.makeLine(x2, y2, rotatedPoint2.x, rotatedPoint2.y),
    ];
    lines.forEach((line) => (line.linewidth = this.style.lineWidth - 0.5));
    return lines;
  }

  private drawWeight(x1: number, y1: number, x2: number, y2: number) {
    const unitVec = convertVectorToUnitVector({ x: x1 - x2, y: y1 - y2 });
    const length = getDistanceBetweenPoints(x1, y1, x2, y2);
    const newPoint = {
      x: x1 - unitVec.x * (length / 2),
      y: y1 - unitVec.y * (length / 2),
    };
    this.weightRec = this.two.makeRectangle(
      newPoint.x,
      newPoint.y,
      this.style.weightRecWidth,
      this.style.weightRecWidth
    );
    this.weightRec.linewidth = 2;
    this.weightText = new Two.Text(
      this.weight.toString(),
      newPoint.x,
      newPoint.y,
      {
        size: this.style.weightFontSize,
      }
    );
    this.two.scene.add(this.weightText);
  }

  set color(color: string) {
    this.line.stroke = color;
    this.arrowLines.forEach((line) => (line.stroke = color));
    if (this.weightRec) this.weightRec.stroke = color;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.weightText) this.weightText.fill = color;
  }
}
