import { Array2D } from "./2d-array";

const thing = new Array2D(document.body, [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
]);

setTimeout(() => {
  thing.changeColor(2, "lightgreen");
}, 1000);

setTimeout(() => {
  thing.changeColor(7, "pink");
}, 2000);

let ms = 3000;

const fc = () => {
  setTimeout(() => {
    thing.swapElements(2, 7);
    ms += 3000;
    fc();
  }, ms);
};

fc();

// setTimeout(() => {
//   thing.swapElements(0, 4);
//   thing.swapElements(1, 3);
// }, 5000);

// setTimeout(() => {
//   thing.swapElements(0, 4);
//   thing.swapElements(1, 3);
// }, 10000);
