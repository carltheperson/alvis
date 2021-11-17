import { Chart } from "../../chart/chart";
import { getRandomUnsortedArray } from "../../util";

/*
O(1)S
o(n^2)T
*/

export const bubbleSort = async () => {
  const array = getRandomUnsortedArray(20);
  const alvis = new Chart(document.body, array, {
    barWidth: 30,
  });

  let swapAmount = 0;
  let end = array.length - 1;

  do {
    swapAmount = 0;

    for (let i = 0; i <= end; i++) {
      await alvis.changeColor(i, "lightgrey", 50);
      if (array[i] > array[i + 1]) {
        await alvis.swapElements(i, i + 1, 500);
        alvis.changeColor(i, "lightgrey");
        swapAmount += 1;
      }
    }

    end -= 1;

    alvis.changeColorsInRange(end, array.length - 1, "lightgreen");
    alvis.changeColorsInRange(0, end, "white");

    await alvis.wait(200);
  } while (swapAmount !== 0);
  alvis.changeAllColors("lightgreen");
};
