import { Chart } from "../../chart/chart";
import { getRandomUnsortedArray } from "../../util";

export const selectionSort = async (container: HTMLDivElement) => {
  const array = getRandomUnsortedArray(20);
  const alvis = new Chart(container, "Selection sort", array, {
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
      await alvis.changeColor(i, "lightgrey");
      await alvis.changeColor(smallestIndex, "yellow", 300);
    }
    await alvis.swapElements(currentIndex, smallestIndex, 800);
    alvis.changeColorsInRange(0, currentIndex, "lightgreen");
    currentIndex += 1;
  }
  alvis.changeAllColors("lightgreen");
};
