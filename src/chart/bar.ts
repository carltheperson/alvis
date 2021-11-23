import * as Two from "twojs-ts";

export class Bar {
  private two: Two | null = null;
  private rectangle: Two.Rectangl;

  constructor(two: Two, x: number, y: number, width: number, height: number) {
    this.two = two;
    this.rectangle = two.makeRectangle(x, y, width, height);
  }

  set y(y: number) {
    if (this.rectangle) {
      this.rectangle.translation.y = y;
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
    }
  }

  get x(): number {
    if (this.rectangle) {
      return this.rectangle.translation.x;
    } else return -1;
  }

  set opacity(opacity: number) {
    this.rectangle.opacity = opacity;
  }

  set color(color: string) {
    if (this.rectangle && color) this.rectangle.fill = color;
  }

  displayOnTop(): void {
    const recClone = this.rectangle?.clone();
    this.rectangle?.remove();
    this.rectangle = recClone;
  }
}
