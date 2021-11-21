import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";
import { Graph } from "./graph/graph";
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

// new Graph(document.body, values).changeColor(2, 1, "blue");

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
