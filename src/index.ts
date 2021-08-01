import { Array2D } from "./2d-array";

const thing = new Array2D(
  document.body,
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  100
);

thing.swapElements(1, 3);
thing.changeColor(7, "pink");
thing.swapElements(2, 4);

thing.changeColor(2, "lightgreen");
thing.wait(3000);
thing.changeColor(3, "lightgreen");

// let ms = 3000;

// const fc = () => {
//   setTimeout(() => {
//     thing.swapElements(2, 7);
//     ms += 3000;
//     fc();
//   }, ms);
// };

// fc();

// setTimeout(() => {
//   thing.swapElements(0, 4);
//   thing.swapElements(1, 3);
// }, 5000);

// setTimeout(() => {
//   thing.swapElements(0, 4);
//   thing.swapElements(1, 3);
// }, 10000);
