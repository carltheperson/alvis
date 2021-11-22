import { Alvis } from "../alvis";
import { convertVectorToUnitVector } from "../util";
import { Edge, EdgeStyle } from "./edge";
import { Node, NodeStyle } from "./node";

enum Default {
  NODE_RADIUS = 50,
  PADDING = 100,
}

interface Style {
  nodeRadius?: number;
  padding?: number;
}

type AllStyles = Style & NodeStyle;
type AllStylesRequired = Required<Style> & NodeStyle & EdgeStyle;

export type SimpleNode = {
  text: string;
  gridPosition: { i: number; j: number };
  edges: SimpleEdge[];
};

export type SimpleEdge = {
  node: SimpleNode;
};

export class Graph extends Alvis {
  public head: Node;
  private style: AllStylesRequired;

  constructor(
    element: HTMLElement,
    headNode: SimpleNode,
    style: AllStyles = {}
  ) {
    super(element);

    this.style = {
      ...style,
      nodeRadius: style.nodeRadius ?? Default.NODE_RADIUS,
      padding: style.padding ?? Default.PADDING,
    };

    this.head = this.generateNode(headNode);

    this.updateCanvasSize(headNode);
  }

  private getLargestGridPosition(
    simpleNode: SimpleNode,
    pos: "i" | "j"
  ): number {
    if (simpleNode.edges.length === 0) {
      return simpleNode.gridPosition[pos];
    }
    return Math.max(
      ...simpleNode.edges.map((edge) => {
        return this.getLargestGridPosition(edge.node, pos);
      })
    );
  }

  private generateEdges(
    startX: number,
    startY: number,
    simpleEdges: SimpleEdge[]
  ) {
    return simpleEdges.map((simpleEdge) => {
      const node = this.generateNode(simpleEdge.node);
      const unitVec = convertVectorToUnitVector({
        x: startX - node.x,
        y: startY - node.y,
      });
      return new Edge(
        this.two,
        node,
        startX - unitVec.x * this.style.nodeRadius,
        startY - unitVec.y * this.style.nodeRadius,
        node.x + unitVec.x * this.style.nodeRadius,
        node.y + unitVec.y * this.style.nodeRadius
      );
    });
  }

  private generateNode(simpleNode: SimpleNode): Node {
    const i = simpleNode.gridPosition.j;
    const j = simpleNode.gridPosition.i;
    const x =
      i * this.style.nodeRadius * 2 +
      this.style.nodeRadius +
      1 +
      this.style.padding * i;
    const y =
      j * this.style.nodeRadius * 2 +
      this.style.nodeRadius +
      1 +
      this.style.padding * j;
    const node = new Node(
      this.two,
      x,
      y,
      this.style.nodeRadius,
      simpleNode.text,
      this.generateEdges(x, y, simpleNode.edges)
    );
    return node;
  }

  private updateCanvasSize(simpleHead: SimpleNode) {
    const maxI = this.getLargestGridPosition(simpleHead, "i");
    const maxJ = this.getLargestGridPosition(simpleHead, "j");
    this.canvasWidth =
      this.style.nodeRadius * 2 * (maxJ + 1) + this.style.padding * maxJ;
    this.canvasHeight =
      this.style.nodeRadius * 2 * (maxI + 1) + this.style.padding * maxI;
  }
}
