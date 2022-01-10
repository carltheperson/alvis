import { SimpleNode } from "../graph/graph";

const a: SimpleNode = {
  text: "A",
  gridPosition: { i: 1, j: 2 },
  edges: [],
};

const b: SimpleNode = {
  text: "B",
  gridPosition: { i: 1, j: 1 },
  edges: [],
};

const c: SimpleNode = {
  text: "C",
  gridPosition: { i: 0, j: 2 },
  edges: [],
};

const d: SimpleNode = {
  text: "D",
  gridPosition: { i: 1, j: 3 },
  edges: [],
};

const e: SimpleNode = {
  text: "E",
  gridPosition: { i: 2, j: 2 },
  edges: [],
};

const f: SimpleNode = {
  text: "F",
  gridPosition: { i: 1, j: 0 },
  edges: [],
};

const g: SimpleNode = {
  text: "G",
  gridPosition: { i: 0, j: 3 },
  edges: [],
};

const h: SimpleNode = {
  text: "H",
  gridPosition: { i: 2, j: 3 },
  edges: [],
};

const i: SimpleNode = {
  text: "I",
  gridPosition: { i: 3, j: 2 },
  edges: [],
};

const j: SimpleNode = {
  text: "J",
  gridPosition: { i: 3, j: 1 },
  edges: [],
};

a.edges.push({ node: b }, { node: c }, { node: e });
f.edges.push({ node: c });
c.edges.push({ node: g });
g.edges.push({ node: d });
d.edges.push({ node: h });
e.edges.push({ node: i });
i.edges.push({ node: j });
j.edges.push({ node: e });
b.edges.push({ node: f });

export { a as BFSExample };
