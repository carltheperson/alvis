import { Array2D } from "./2d-array";

const array = [7, 6, 4, 10, 1, 8, 5, 2, 9, 4, 3];

const alvis = new Array2D(document.body, array, 100);

let swapAmount = 0;
let bubbledIndex = array.length - 1;

do {
  swapAmount = 0;
  array.forEach((num, i) => {
    if (i >= bubbledIndex) {
      return;
    }
    alvis.changeColor(i, "#e6e6e6", 200);
    if (array[i] > array[i + 1]) {
      alvis.swapElements(i, i + 1);
      alvis.changeColor(i, "#e6e6e6");
      swapAmount += 1;
    }
  });
  alvis.changeColorsInRange(bubbledIndex, array.length - 1, "lightgreen");
  // alvis.changeColor(bubbledIndex, "green");
  alvis.changeColorsInRange(0, bubbledIndex - 1, "white");
  bubbledIndex -= 1;
  alvis.wait(500);
} while (swapAmount !== 0);

alvis.changeAllColors("lightgreen");

// alvis.swapElements(1, 3);
// alvis.changeColor(7, "pink");
// alvis.swapElements(2, 4);

// alvis.changeColor(2, "lightgreen");
// alvis.wait(3000);
// alvis.changeColor(3, "lightgreen");

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
