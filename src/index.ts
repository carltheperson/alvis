import { Array2D } from "./2d-array";

const thing = new Array2D(["a", "b", "c", "d", "e"]);

setTimeout(() => {
  thing.changeColor(2, "lightgreen");
}, 1000);

setTimeout(() => {
  thing.changeColor(4, "pink");
}, 2000);

setTimeout(() => {
  thing.swapElements(2, 4);
  thing.swapElements(1, 3);
}, 3000);

setTimeout(() => {
  thing.swapElements(0, 4);
  thing.swapElements(1, 3);
}, 5000);

setTimeout(() => {
  thing.swapElements(2, 4);
  thing.swapElements(1, 3);
}, 8000);

setTimeout(() => {
  thing.swapElements(0, 4);
  thing.swapElements(1, 3);
}, 10000);
