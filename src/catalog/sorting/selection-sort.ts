import { Chart } from "../../chart/chart";
import { getRandomUnsortedArray } from "../../util";

export const selectionSort = async () => {
  const array = getRandomUnsortedArray(20);
  const alvis = new Chart(document.body, array, {
    barWidth: 30,
  });
  let currentIndex = 0;
  while (currentIndex < array.length - 1) {
    let smallestIndex = currentIndex;
    for (let i = currentIndex; i < array.length; i++) {
      if (array[i] < array[smallestIndex]) {
        smallestIndex = i;
      }
      alvis.changeColorsInRange(currentIndex, smallestIndex - 1, "white");
      alvis.changeColorsInRange(smallestIndex + 1, array.length - 1, "white");
      await alvis.changeColor(i, "grey");
      await alvis.changeColor(smallestIndex, "yellow", 350);
    }
    await alvis.swapElements(currentIndex, smallestIndex, 1000);
    alvis.changeColorsInRange(0, currentIndex, "lightgreen");
    currentIndex += 1;
  }
  alvis.changeAllColors("lightgreen");
};
