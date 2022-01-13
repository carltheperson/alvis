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
  let swapAmount = 0;
  let end = array.length - 1;

  do {
    swapAmount = 0;

    for (let i = 0; i <= end; i++) {
      await alvis.changeColor(i, "yellow", 400 * delta);
      if (array[i] > array[i + 1]) {
        await alvis.swapElements(i, i + 1, 1000 * delta);

        swapAmount += 1;
      }
      alvis.changeColor(i, "white");
    }

    end -= 1;

    alvis.changeColorsInRange(end, array.length - 1, "lightgreen");
    alvis.changeColorsInRange(0, end, "white");

    await timeout(200 * delta);
  } while (swapAmount !== 0);
  alvis.changeAllColors("lightgreen");
};

export const bubbleSort = async (container: HTMLDivElement) => {
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
