import { Colors2D } from "../common/colors2d";
import { Node } from "./node";

enum Default {
  NODE_RADIUS = 50,
}

export class Graph extends Colors2D {
  private nodes: Node[][];

  constructor(element: HTMLElement, values: string[][]) {
    super(element);
    this.nodes = this.generateNodes(values);
    this.entities = this.nodes;
  }

  private generateNodes1d(values: string[], extraYOffset: number) {
    return values.map((value, i) => {
      return new Node(
        this.two,
        i * Default.NODE_RADIUS * 2 + Default.NODE_RADIUS + 1,
        extraYOffset + Default.NODE_RADIUS + 1,
        Default.NODE_RADIUS,
        value
      );
    });
  }

  private generateNodes(values: string[][]) {
    return values.map((values_, i) => {
      return this.generateNodes1d(values_, i * Default.NODE_RADIUS * 2);
    });
  }
}
