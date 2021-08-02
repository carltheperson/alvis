import * as Two from "twojs-ts";

interface Rectangle extends Two.Rectangl {
  index: number;
  text: Two.Text;
}

export class Cell {
  private rectangle: Rectangle | null = null;
  private two: Two | null = null;

  constructor(
    two: Two,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ) {
    this.two = two;
    const rec = two.makeRectangle(x, y, width, height);
    rec.linewidth = 2;
    const text_ = new Two.Text(text, x, y, { size: 18, weight: 800 });
    two.scene.add(text_);
    this.rectangle = Object.assign(rec, { index: 0, text: text_ });
  }

  set y(y: number) {
    if (this.rectangle) {
      this.rectangle.translation.y = y;
      this.rectangle.text.translation.y = y;
    }
  }
  get y(): number {
    if (this.rectangle) {
      return this.rectangle.translation.y;
    } else return -1;
  }
  set x(x: number) {
    if (this.rectangle) {
      this.rectangle.translation.x = x;
      this.rectangle.text.translation.x = x;
    }
  }

  get x(): number {
    if (this.rectangle) {
      return this.rectangle.translation.x;
    } else return -1;
  }

  set width(n: number) {
    if (this.rectangle) this.rectangle;
  }

  set color(color: string) {
    if (this.rectangle && color) this.rectangle.fill = color;
  }

  set strokeWidth(strokeWidth: number) {
    if (this.rectangle && strokeWidth) this.rectangle.linewidth = strokeWidth;
  }

  displayOnTop(): void {
    const recClone = this.rectangle?.clone();
    const textClone = this.rectangle?.text?.clone();
    this.removeGraphicalElement();
    this.rectangle = Object.assign(recClone, {
      index: this.rectangle?.index,
      text: textClone,
    });
  }

  removeGraphicalElement(): void {
    this.rectangle?.remove();
    this.two?.scene.remove(this.rectangle?.text);
  }
}
