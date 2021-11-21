import { Colors2D } from "../common/colors2d";
import { Node, NodeStyle } from "./node";

enum Default {
  NODE_RADIUS = 30,
  PADDING = 10,
}

interface Style {
  nodeRadius?: number;
  padding?: number;
}

type AllStyles = Style & NodeStyle;
type AllStylesRequired = Required<Style> & NodeStyle;

export class Graph extends Colors2D {
  private nodes: Node[][];
  private style: AllStylesRequired;

  constructor(element: HTMLElement, values: string[][], style: AllStyles = {}) {
    super(element);
    this.style = {
      ...style,
      nodeRadius: style.nodeRadius ?? Default.NODE_RADIUS,
      padding: style.padding ?? Default.PADDING,
    };
    this.nodes = this.generateNodes(values);
    this.entities = this.nodes;
    this.updateCanvasSize();
  }

  private generateNodes1d(values: string[], extraYOffset: number) {
    return values.map((value, i) => {
      return new Node(
        this.two,
        i * this.style.nodeRadius * 2 +
          this.style.nodeRadius +
          1 +
          this.style.padding * i,
        extraYOffset + this.style.nodeRadius + 1,
        this.style.nodeRadius,
        value,
        this.style
      );
    });
  }

  private generateNodes(values: string[][]) {
    return values.map((values_, i) => {
      return this.generateNodes1d(
        values_,
        i * this.style.nodeRadius * 2 + this.style.padding * i
      );
    });
  }

  private updateCanvasSize() {
    this.canvasWidth =
      this.style.nodeRadius * 2 * this.nodes[0].length +
      this.style.padding * (this.nodes[0].length - 1);
    this.canvasHeight =
      this.style.nodeRadius * 2 * this.nodes.length +
      this.style.padding * (this.nodes.length - 1);
  }
}
