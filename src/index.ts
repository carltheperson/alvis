import { breadthFirstSearch } from "./catalog/graphs/breadth-first-search";
import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";
import { grokkingAlgoBFSExample } from "./example-data/grokking-graph";
import { letterGraphExample } from "./example-data/letter-graph";
import { Graph, SimpleEdge, SimpleNode } from "./graph/graph";
import { Node } from "./graph/node";
import { TextGrid } from "./grid/text-grid";
import { Queue } from "./queue/queue";
import { timeout } from "./util";

// queue.move(0, 700);
// queue.fadeOut(0, 700);
// queue.move(1, 700);
// queue.move(2, 700);

// bubbleSort();
// insertionSort();
// selectionSort();

breadthFirstSearch();

// const graph = new Graph(document.body, grokkingAlgoBFSExample, {
//   textSize: 25,
// });
// const graph1 = new Graph(document.body, letterGraphExample, {
//   textSize: 25,
// });
// graph.head.color = "lightgreen";

// const color = async (node: Node) => {
//   node.color = "lightgreen";
//   await timeout(700);

//   for (const edge of node.edges) {
//     edge.color = "red";
//     await timeout(500);
//     await color(edge.node);
//   }
// };
// color(graph.head);
// color(graph1.head);
