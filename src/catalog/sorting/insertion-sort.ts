/*
O(1)S
o(n^2)T
*/

import { Chart } from "../../chart/chart";
import { getRandomUnsortedArray } from "../../util";

export const insertionSort = async () => {
  const array = getRandomUnsortedArray(20);
  const alvis = new Chart(document.body, array, {
    barWidth: 30,
  });

  let j = 0;
  for (let i = 0; i < array.length; i++) {
    await alvis.changeColor(i, "yellow", 50);
    j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      await alvis.swapElements(j - 1, j, 500);
      j -= 1;
    }
    await alvis.wait(50);
    await alvis.changeColor(j, "lightgreen", 300);
    await alvis.changeColor(j, "white", 50);
  }
  alvis.changeAllColors("lightgreen");
  return array;
};
