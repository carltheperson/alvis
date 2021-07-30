import Two from "twojs-ts";
import { Alvis } from "./alvis";

interface Rectangle extends Two.Rectangl {
  index: number;
  text: Two.Text;
}

export class Array2D extends Alvis {
  private rectangles: Rectangle[] = [];

  constructor() {
    super();
  }

  private generateRectangles(n: number): Rectangle[] {
    return new Array(n).fill(0).map((_, i) => {
      const rec = this.two.makeRectangle(
        this.two.width / 2 + i * 50,
        this.two.height / 2,
        50,
        50
      );
      const text = new Two.Text(
        i.toString(),
        this.two.width / 2 + i * 50,
        this.two.height / 2,
        {}
      );
      this.two.scene.add(text);
      return Object.assign(rec, { index: i, text });
    });
  }

  drawArray(): void {
    this.rectangles = this.generateRectangles(5);
    super.bindUpdateCallback((frameCount) => {
      this.rectangles.forEach((rec) => {});
    });
  }
}
