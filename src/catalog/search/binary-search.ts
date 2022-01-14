import { Array1D } from "../../array/array1d";
import { TextField } from "../../text-field/text-field";
import {
  addSmallTitle,
  addWhitespace,
  getRandomUnsortedArray,
} from "../../util";

export const binarySearch = async (container: HTMLDivElement) => {
  addWhitespace(container, 200);
  const array = getRandomUnsortedArray(25)
    .map((n) => n + Math.ceil(Math.random() * 2) - 6)
    .sort((a, b) => a - b);
  const targetIndex = Math.floor(Math.random() * array.length);
  const target = array[targetIndex];
  addSmallTitle("target = " + target, container);
  addWhitespace(container, 25);
  const alvis = new Array1D(container, array, {
    textSize: 22,
    cellWidth: 60,
  });
  const text = new TextField(container, 120, { textSize: 22 });

  let left = 0;
  let right = array.length - 1;
  do {
    await alvis.changeColorsInRange(left, right, "yellow", 750);

    const middle = Math.floor((left + right) / 2);
    await alvis.changeColor(middle, "dodgerBlue", 1000);
    if (array[middle] < target) {
      await alvis.changeColorsInRange(left, middle - 1, "tomato", 1000);
      left = middle + 1;
      text.text = `${array[middle]} < ${target}`;
    } else if (array[middle] > target) {
      await alvis.changeColorsInRange(middle + 1, right, "tomato", 1000);
      right = middle - 1;
      text.text = `${array[middle]} > ${target}`;
    } else {
      text.text = `${array[middle]} == ${target}`;
      text.color = "green";
      alvis.changeColor(middle, "LimeGreen");
      break;
    }
    alvis.changeAllColors("white", 0);
  } while (left <= right);
};
