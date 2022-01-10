import { SimpleEdge, SimpleNode } from "../graph/graph";

const a: SimpleNode = {
  text: "A",
  gridPosition: { i: 2, j: 1 },
  edges: [],
};

const b: SimpleNode = {
  text: "B",
  gridPosition: { i: 1, j: 3 },
  edges: [],
};

const c: SimpleNode = {
  text: "C",
  gridPosition: { i: 3, j: 3 },
  edges: [],
};

const d: SimpleNode = {
  text: "D",
  gridPosition: { i: 2, j: 5 },
  edges: [],
};

a.edges.push({ node: b, weight: 100 }, { node: c, weight: 1 });
b.edges.push({ node: d, weight: -1000 });
c.edges.push({ node: d, weight: 1 });

export { a as videoGraphExample };
