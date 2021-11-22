import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";
import { Graph, SimpleEdge, SimpleNode } from "./graph/graph";
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

const graph = new Graph(document.body, headNode);
