import { Array1D } from "../../array/array1d";
import { TextField } from "../../text-field/text-field";
import { getRandomUnsortedArray } from "../../util";

const TARGET_SUM = 12;

export const smallestSubArrayWithCondition = async (
  container: HTMLDivElement
) => {
  new TextField(container, 400).text =
    "Smallest subarray length with sum greater than " + TARGET_SUM;
  const array = getRandomUnsortedArray(10);
  array[7] = TARGET_SUM;
  const alvis = new Array1D(container, array);

  let minLength = Infinity;
  const currentSumTextField = new TextField(container, 150);
  const minLengthTextField = new TextField(container, 210);
  let currentSum = 0;
  const conditionTextField = new TextField(container, 300);

  const markWindow = async (start: number, end: number, duration = 2000) => {
    if (currentSum >= TARGET_SUM) {
      await alvis.changeColorsInRange(start, end, "lightGreen", duration);
    } else {
      await alvis.changeColorsInRange(start, end, "tomato", duration);
    }
  };

  const displayCurrentSum = async () => {
    currentSumTextField.text = "Current sum: " + currentSum;
    if (currentSum >= TARGET_SUM) {
      currentSumTextField.color = "green";
    } else {
      currentSumTextField.color = "red";
    }
  };

  const updateMinLength = (start: number, end: number) => {
    if (currentSum < TARGET_SUM) {
      minLengthTextField.color = "black";
      return;
    }

    const length = end - start + 1;
    if (length < minLength) {
      minLength = length;
      minLengthTextField.color = "green";
    }
    minLengthTextField.text = "Min subarray length: " + minLength;
  };

  let start = 0;
  for (let end = 0; end < array.length; end++) {
    currentSum += array[end];
    displayCurrentSum();
    updateMinLength(start, end);
    await markWindow(start, end);

    while (currentSum >= TARGET_SUM) {
      currentSum -= array[start];
      displayCurrentSum();
      start += 1;
      updateMinLength(start, end);
      alvis.changeAllColors("white", 0);
      await markWindow(start, end);
      if (end - start === 0) break;
    }

    conditionTextField.color = "black";
    alvis.changeAllColors("white", 0);
  }

  currentSumTextField.color = "black";
};
