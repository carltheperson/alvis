import * as Two from "twojs-ts";
import { Edge } from "./edge";

enum Default {
  TEXT_SIZE = 16,
  TEXT_WEIGHT = 700,
}

export interface NodeStyle {
  textSize?: number;
  textWeight?: number;
}

interface Circle extends Two.Circle {
  text: Two.Text;
}

export class Node {
  private circle: Circle;
  private two: Two;
  public edges: Edge[];

  constructor(
    two: Two,
    x: number,
    y: number,
    radius: number,
    text: string,
    edges: Edge[],
    style: NodeStyle = {}
  ) {
    this.two = two;
    this.edges = edges;

    const newStyle = {
      textSize: style.textSize ?? Default.TEXT_SIZE,
      textWeight: style.textWeight ?? Default.TEXT_WEIGHT,
    };

    const circle = this.two.makeCircle(x, y, radius);
    const text_ = new Two.Text(text, x, y, {
      size: newStyle.textSize,
      weight: newStyle.textWeight,
    });

    two.scene.add(text_);
    this.circle = Object.assign(circle, { text: text_ });
  }

  set y(y: number) {
    this.circle.translation.y = y;
    this.circle.text.translation.y = y;
  }

  get y() {
    return this.circle.translation.y;
  }

  set x(x: number) {
    this.circle.translation.x = x;
    this.circle.text.translation.x = x;
  }

  get x() {
    return this.circle.translation.x;
  }

  set text(text: string) {
    this.circle.text.value = text;
  }

  get text() {
    return this.circle.text.value;
  }

  set color(color: string) {
    this.circle.fill = color;
  }

  get color() {
    return this.circle.fill;
  }

  displayOnTop() {
    const circleClone = this.circle.clone();
    const textClone = this.circle.text.clone();
    this.removeGraphicalElement();
    this.circle = Object.assign(circleClone, {
      text: textClone,
    });
  }

  removeGraphicalElement() {
    this.circle.remove();
    this.two.scene.remove(this.circle.text);
  }
}
