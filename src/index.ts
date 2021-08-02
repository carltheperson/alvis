import { Array1D } from "./array/array1d";

const array = [10, 3, 8, 4, 6, 5, 7, 9, 2, 1];

const alvis = new Array1D(document.body, array, 100);

const runAlgo = async () => {
  let swapAmount = 0;
  let bubbledIndex = array.length - 1;

  do {
    swapAmount = 0;
    for (let i = 0; i <= bubbledIndex; i++) {
      await alvis.changeColor(i, "#e6e6e6", 300);
      if (array[i] > array[i + 1]) {
        await alvis.swapElements(i, i + 1, 1000);
        alvis.changeColor(i, "#e6e6e6");
        swapAmount += 1;
      }
    }
    alvis.changeColorsInRange(bubbledIndex, array.length - 1, "lightgreen");
    alvis.changeColorsInRange(0, bubbledIndex - 1, "white");
    bubbledIndex -= 1;
    await alvis.wait(500);
  } while (swapAmount !== 0);
  alvis.changeAllColors("lightgreen");
};
runAlgo();
