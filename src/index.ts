import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";
import { Graph, SimpleEdge, SimpleNode } from "./graph/graph";
import { Node } from "./graph/node";
import { TextGrid } from "./grid/text-grid";
import { timeout } from "./util";

// bubbleSort();
// insertionSort();
// selectionSort();

const headNode: SimpleNode = {
  gridPosition: { i: 0, j: 0 },
  text: "Aaaaa",
  edges: [
    {
      node: {
        text: "a2",
        gridPosition: { i: 1, j: 0 },
        edges: [
          {
            node: {
              text: "c4",
              gridPosition: { i: 2, j: 2 },
              edges: [],
            },
          },
        ],
      },
    },
  ],
};

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

you.edges.push({ node: bob });
you.edges.push({ node: alice });
you.edges.push({ node: clare });

bob.edges.push({ node: anuj });

clare.edges.push({ node: thom });
clare.edges.push({ node: jonny });

bob.edges.push({ node: peggy });
alice.edges.push({ node: peggy });

// const a2: SimpleNode = {
//   text: "a2",
//   gridPosition: { i: 1, j: 0 },
//   edges: [],
// };

// const c4: SimpleNode = {
//   text: "c4",
//   gridPosition: { i: 2, j: 2 },
//   edges: [],
// };

const graph = new Graph(document.body, you);
graph.head.color = "lightgreen";

const color = async (node: Node) => {
  node.color = "lightgreen";
  await timeout(1000);

  for (const edge of node.edges) {
    edge.color = "red";
    await timeout(1000);
    await color(edge.node);
  }
};
color(graph.head);
