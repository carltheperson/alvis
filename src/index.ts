import { Array1D } from "./array/array1d";

const array = [9, 5, 2, 1, 10];

const alvis = new Array1D(document.body, array, {
  cellWidth: 50,
  textSize: 10,
});

(async () => {
  let swapAmount = 0;
  let end = array.length - 1;

  do {
    swapAmount = 0;

    for (let i = 0; i <= end; i++) {
      await alvis.changeColor(i, "lightgrey", 200);
      if (array[i] > array[i + 1]) {
        await alvis.swapElements(i, i + 1, 500);
        alvis.changeColor(i, "lightgrey");
        swapAmount += 1;
      }
    }

    end -= 1;

    alvis.changeColorsInRange(end, array.length - 1, "lightgreen");
    alvis.changeColorsInRange(0, end, "white");

    await alvis.wait(50);
  } while (swapAmount !== 0);
  alvis.changeAllColors("lightgreen");
})();
