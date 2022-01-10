import { SimpleNode } from "../graph/graph";

const a: SimpleNode = {
  gridPosition: { i: 1, j: 0 },
  text: "A",
  edges: [],
};

const b: SimpleNode = {
  gridPosition: { i: 2, j: 1 },
  text: "B",
  edges: [],
};

const c: SimpleNode = {
  gridPosition: { i: 0, j: 1 },
  text: "C",
  edges: [],
};

const d: SimpleNode = {
  gridPosition: { i: 1, j: 2 },
  text: "D",
  edges: [],
};

a.edges.push({ node: b, weight: 6 });
a.edges.push({ node: c, weight: 5 });

b.edges.push({ node: c, weight: -2 });

c.edges.push({ node: d, weight: 2 });

const allNodes = [a, b, c, d];

const allData = {
  ...a,
  allNodes,
  tail: d,
};

export { allData as graphWithNegativeWeight };
