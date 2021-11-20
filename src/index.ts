import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";
import { TextGrid } from "./grid/text-grid";

// bubbleSort();
// insertionSort();
// selectionSort();

const values = [
  ["aaaaaaaaaaaa", "b", "c"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a4", "b4", "c4"],
];

const grid = new TextGrid(document.body, values, {
  cellWidth: 100,
});

// grid.changeColorForRow(1, "lightgreen");
grid.changeColor(1, 2, "blue");
grid.changeColor(2, 1, "blue");
grid.changeColorForColumn(0, "green");
grid.changeColorForRow(3, "red");
// grid.changeColor();
