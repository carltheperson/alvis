import { Array1D } from "../../array/array1d";
import { Chart } from "../../chart/chart";
import { DEFAULT_ARRAY_STYLE, DEFAULT_CHART_STYLE } from "../../constants";
import {
  addWhitespace,
  getRandomUnsortedArray,
  setUpSwitchButton,
} from "../../util";

const runAlgorithm = async (
  array: number[],
  alvis: Array1D | Chart,
  delta: number
) => {
  let currentIndex = 0;
  while (currentIndex < array.length - 1) {
    let smallestIndex = currentIndex;
    for (let i = currentIndex; i < array.length; i++) {
      if (array[i] < array[smallestIndex]) {
        smallestIndex = i;
      }
      alvis.changeColorsInRange(currentIndex, smallestIndex - 1, "white");
      alvis.changeColorsInRange(smallestIndex + 1, array.length - 1, "white");
      await alvis.changeColor(i, "yellow", 0);
      await alvis.changeColor(smallestIndex, "dodgerBlue", 700 * delta);
    }
    await alvis.swapElements(currentIndex, smallestIndex, 1000 * delta);
    alvis.changeColorsInRange(0, currentIndex, "lightgreen");
    currentIndex += 1;
  }
  alvis.changeAllColors("lightgreen");
};

export const selectionSort = async (container: HTMLDivElement) => {
  const mainContainer = document.createElement("div");

  const switchHandler = (chart: boolean) => {
    if (chart) {
      addWhitespace(mainContainer, 50);
      const array = getRandomUnsortedArray(20);
      const alvis = new Chart(mainContainer, array, DEFAULT_CHART_STYLE);
      runAlgorithm(array, alvis, 0.4);
    } else {
      addWhitespace(mainContainer, 200);
      const array = getRandomUnsortedArray(8);
      const alvis = new Array1D(mainContainer, array, DEFAULT_ARRAY_STYLE);
      runAlgorithm(array, alvis, 1);
    }
  };

  setUpSwitchButton(container, mainContainer, switchHandler);
};
