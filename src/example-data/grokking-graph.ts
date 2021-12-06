import { SimpleNode } from "../graph/graph";

const anuj: SimpleNode = {
  gridPosition: { i: 0, j: 0 },
  text: "Anuj",
  edges: [],
};

const peggy: SimpleNode = {
  gridPosition: { i: 1, j: 1 },
  text: "Peggy",
  edges: [],
};

const bob: SimpleNode = {
  gridPosition: { i: 0, j: 1 },
  text: "Bob",
  edges: [],
};

const you: SimpleNode = {
  gridPosition: { i: 0, j: 2 },
  text: "You",
  edges: [],
};

const alice: SimpleNode = {
  gridPosition: { i: 1, j: 2 },
  text: "Alice",
  edges: [],
};

const clare: SimpleNode = {
  gridPosition: { i: 0, j: 3 },
  text: "Clare",
  edges: [],
};

const thom: SimpleNode = {
  gridPosition: { i: 0, j: 4 },
  text: "Thom",
  edges: [],
};

const jonny: SimpleNode = {
  gridPosition: { i: 1, j: 3 },
  text: "Jonny",
  edges: [],
};

you.edges.push({ node: bob, weight: 5 });
you.edges.push({ node: alice, weight: 7 });
you.edges.push({ node: clare });

bob.edges.push({ node: anuj, weight: 2 });

clare.edges.push({ node: thom });
clare.edges.push({ node: jonny });

bob.edges.push({ node: peggy, weight: 10 });
alice.edges.push({ node: peggy });

export { you as grokkingAlgoBFSExample };
