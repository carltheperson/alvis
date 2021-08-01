import { Array2D } from "./2d-array";

const thing = new Array2D();

setTimeout(() => {
  thing.changeColor(2, "lightgreen");
}, 1000);

setTimeout(() => {
  thing.swapElements(2, 4);
}, 3000);
