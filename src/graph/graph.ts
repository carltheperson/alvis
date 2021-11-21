import { Colors2D } from "../common/colors2d";
import { Edge, EdgeStyle } from "./edge";
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
type AllStylesRequired = Required<Style> & NodeStyle & EdgeStyle;

export type SimpleEdge = {
  node1: { i: number; j: number };
  node2: { i: number; j: number };
};

export class Graph extends Colors2D {
  private nodes: (Node | null)[][];
  private edges: Edge[];
  private style: AllStylesRequired;

  constructor(
    element: HTMLElement,
    nodes: (string | null)[][],
    edges: SimpleEdge[],
    style: AllStyles = {}
  ) {
    super(element);
    this.style = {
      ...style,
      nodeRadius: style.nodeRadius ?? Default.NODE_RADIUS,
      padding: style.padding ?? Default.PADDING,
    };
    this.nodes = this.generateNodes(nodes);
    this.edges = this.generateEdges(edges);
    this.displayAllNodesOnTop();
    this.entities = this.nodes as Node[][];
    this.updateCanvasSize();
  }

  private generateNodes1d(values: (string | null)[], extraYOffset: number) {
    return values.map((value, i) => {
      if (!value) return null;
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

  private generateNodes(values: (string | null)[][]) {
    return values.map((values_, i) => {
      return this.generateNodes1d(
        values_,
        i * this.style.nodeRadius * 2 + this.style.padding * i
      );
    });
  }

  private displayAllNodesOnTop() {
    this.nodes.forEach((nodes) => {
      nodes.forEach((node) => {
        if (node) node.displayOnTop();
      });
    });
  }

  private generateEdges(values: SimpleEdge[]) {
    return values.map((value) => {
      const node1 = this.nodes[value.node1.i][value.node1.j];
      const node2 = this.nodes[value.node2.i][value.node2.j];
      if (!node1 || !node2) throw new Error(`Could not find node1 or node2`);
      return new Edge(this.two, node1.x, node1.y, node2.x, node2.y);
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
