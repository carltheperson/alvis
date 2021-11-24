import { breadthFirstSearch } from "./catalog/graphs/breadth-first-search";
import { depthFirstSearch } from "./catalog/graphs/depth-first-search";
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

// bubbleSort();
// insertionSort();
// selectionSort();
// breadthFirstSearch();
depthFirstSearch();
