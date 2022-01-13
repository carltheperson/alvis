import { Array1D } from "../../array/array1d";
import { Chart } from "../../chart/chart";
import { DEFAULT_ARRAY_STYLE, DEFAULT_CHART_STYLE } from "../../constants";
import {
  addWhitespace,
  getRandomUnsortedArray,
  setUpSwitchButton,
  timeout,
} from "../../util";

const runAlgorithm = async (
  array: number[],
  alvis: Array1D | Chart,
  delta: number
) => {
  let j = 0;
  for (let i = 0; i < array.length; i++) {
    await alvis.changeColor(i, "tomato", 250 * delta);
    j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      await alvis.swapElements(j - 1, j, 800 * delta);
      j -= 1;
    }
    await timeout(50 * delta);
    await alvis.changeColor(j, "lightgreen", 800 * delta);
    await alvis.changeColor(j, "white", 250 * delta);
  }
  alvis.changeAllColors("lightgreen");
};

export const insertionSort = async (container: HTMLDivElement) => {
  const mainContainer = document.createElement("div");

  const switchHandler = (chart: boolean) => {
    if (chart) {
      addWhitespace(mainContainer, 50);
      const array = getRandomUnsortedArray(20);
      const alvis = new Chart(mainContainer, array, DEFAULT_CHART_STYLE);
      runAlgorithm(array, alvis, 0.35);
    } else {
      addWhitespace(mainContainer, 200);
      const array = getRandomUnsortedArray(8);
      const alvis = new Array1D(mainContainer, array, DEFAULT_ARRAY_STYLE);
      runAlgorithm(array, alvis, 1);
    }
  };

  setUpSwitchButton(container, mainContainer, switchHandler);
};
