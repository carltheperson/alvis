import * as Two from "twojs-ts";

interface Rectangle extends Two.Rectangl {
  text: Two.Text;
}

enum Default {
  TEXT_SIZE = 16,
  TEXT_WEIGHT = 700,
}

export interface CellStyle {
  textSize?: number;
  textWeight?: number;
}

export class Cell {
  private rectangle: Rectangle;
  private two: Two;

  constructor(
    two: Two,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    style: CellStyle
  ) {
    const newStyle = {
      textSize: style.textSize ?? Default.TEXT_SIZE,
      textWeight: style.textWeight ?? Default.TEXT_WEIGHT,
    };

    this.two = two;
    const rec = two.makeRectangle(x, y, width, height);
    rec.linewidth = 2;
    const text_ = new Two.Text(text, x, y, {
      size: newStyle.textSize,
      weight: newStyle.textWeight,
    });
    two.scene.add(text_);
    this.rectangle = Object.assign(rec, { text: text_ });
  }

  set y(y: number) {
    this.rectangle.translation.y = y;
    this.rectangle.text.translation.y = y;
  }

  get y(): number {
    return this.rectangle.translation.y;
  }

  set x(x: number) {
    this.rectangle.translation.x = x;
    this.rectangle.text.translation.x = x;
  }

  get x(): number {
    return this.rectangle.translation.x;
  }

  set text(text: string) {
    this.rectangle.text.value = text;
  }

  set color(color: string) {
    this.rectangle.fill = color;
  }

  set strokeWidth(strokeWidth: number) {
    this.rectangle.linewidth = strokeWidth;
  }

  displayOnTop() {
    const recClone = this.rectangle.clone();
    const textClone = this.rectangle.text.clone();
    this.removeGraphicalElement();
    this.rectangle = Object.assign(recClone, {
      text: textClone,
    });
  }

  removeGraphicalElement() {
    this.rectangle.remove();
    this.two.scene.remove(this.rectangle.text);
  }
}
