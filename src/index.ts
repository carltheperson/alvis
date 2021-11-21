import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";
import { Graph, SimpleEdge } from "./graph/graph";
import { TextGrid } from "./grid/text-grid";
import { timeout } from "./util";

// bubbleSort();
// insertionSort();
// selectionSort();

const values = [
  ["aaaaaa", "b", "c"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a4", "b4", "c4"],
];

const edges: SimpleEdge[] = [
  { node1: { i: 0, j: 0 }, node2: { i: 2, j: 1 } },
  { node1: { i: 1, j: 0 }, node2: { i: 2, j: 1 } },
  { node1: { i: 0, j: 1 }, node2: { i: 3, j: 2 } },
  { node1: { i: 2, j: 1 }, node2: { i: 3, j: 2 } },
];

new Graph(document.body, values, edges, {
  nodeRadius: 50,
  padding: 60,
}).changeColor(2, 1, "blue");

// const grid = new TextGrid(document.body, values, {
//   cellWidth: 100,
// });

// // grid.changeColorForRow(1, "lightgreen");
// grid.changeColor(1, 2, "blue");
// grid.changeColor(2, 1, "blue");
// grid.changeColorForColumn(0, "green");
// grid.changeColorForRow(3, "red");
// // grid.changeColor();

// grid.setText(2, 1, "blue");
// await timeout(500);
// grid.setText(2, 1, "blue2");
// await timeout(500);
// grid.setText(2, 1, "blue");
