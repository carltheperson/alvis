import * as Two from "twojs-ts";

interface Circle extends Two.Circle {
  text: Two.Text;
}

export class Node {
  private circle: Circle;
  private two: Two;

  constructor(two: Two, x: number, y: number, radius: number, text: string) {
    this.two = two;

    const circle = this.two.makeCircle(x, y, radius);
    const text_ = new Two.Text(text, x, y, {
      size: 16,
      weight: 700,
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

  set text(text: string) {
    this.circle.text.value = text;
  }

  set color(color: string) {
    this.circle.fill = color;
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
