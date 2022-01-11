import { SimpleNode } from "../graph/graph";

const a: SimpleNode = {
  gridPosition: { i: 1, j: 2 },
  text: "A",
  edges: [],
};

const b: SimpleNode = {
  gridPosition: { i: 1, j: 1 },
  text: "B",
  edges: [],
};

const c: SimpleNode = {
  gridPosition: { i: 2, j: 2 },
  text: "C",
  edges: [],
};

const d: SimpleNode = {
  gridPosition: { i: 1, j: 3 },
  text: "D",
  edges: [],
};

const e: SimpleNode = {
  gridPosition: { i: 0, j: 1 },
  text: "E",
  edges: [],
};

const f: SimpleNode = {
  gridPosition: { i: 2, j: 1 },
  text: "F",
  edges: [],
};

const g: SimpleNode = {
  gridPosition: { i: 2, j: 3 },
  text: "G",
  edges: [],
};

const h: SimpleNode = {
  gridPosition: { i: 2, j: 4 },
  text: "H",
  edges: [],
};

const i: SimpleNode = {
  gridPosition: { i: 3, j: 0 },
  text: "I",
  edges: [],
};

const j: SimpleNode = {
  gridPosition: { i: 3, j: 2 },
  text: "J",
  edges: [],
};

const k: SimpleNode = {
  gridPosition: { i: 3, j: 3 },
  text: "K",
  edges: [],
};

a.edges.push({ node: b });
a.edges.push({ node: c });
a.edges.push({ node: d });

b.edges.push({ node: f });
b.edges.push({ node: e });

d.edges.push({ node: g });
d.edges.push({ node: h });

f.edges.push({ node: i });
f.edges.push({ node: j });

c.edges.push({ node: g });

j.edges.push({ node: k });

g.edges.push({ node: k });

d.edges.push({ node: h });

export { a as letterGraphExample };
