import { SimpleNode } from "../graph/graph";

const a: SimpleNode = {
  gridPosition: { i: 1, j: 0 },
  text: "A",
  edges: [],
};

const b: SimpleNode = {
  gridPosition: { i: 0, j: 1 },
  text: "B",
  edges: [],
};

const c: SimpleNode = {
  gridPosition: { i: 2, j: 1 },
  text: "C",
  edges: [],
};

const d: SimpleNode = {
  gridPosition: { i: 0, j: 3 },
  text: "D",
  edges: [],
};

const e: SimpleNode = {
  gridPosition: { i: 2, j: 3 },
  text: "E",
  edges: [],
};

const f: SimpleNode = {
  gridPosition: { i: 1, j: 4 },
  text: "F",
  edges: [],
};

a.edges.push({ node: b, weight: 5 }, { node: c, weight: 2 });
b.edges.push({ node: d, weight: 4 }, { node: e, weight: 2 });
c.edges.push({ node: e, weight: 7 });
d.edges.push({ node: e, weight: 6 }, { node: f, weight: 3 });
e.edges.push({ node: f, weight: 1 });

const allNodes = [a, b, c, d, e, f];

export {
  a as weightedLetterExample,
  allNodes as allNodesWeightedLetterExample,
};
