import { Array1D } from "../../array/array1d";
import { TextField } from "../../text-field/text-field";
import { addTitle, getRandomUnsortedArray, timeout } from "../../util";

const SUBARRAY_LENGTH = 3;

export const maxSumFixedSubarray = async () => {
  addTitle("Max sum of subarray with fixed length " + SUBARRAY_LENGTH);
  const array = getRandomUnsortedArray(10);
  const alvis = new Array1D(document.body, array);

  let maxValue = -Infinity;
  let currentRunningSum = 0;
  const currentRunningSumTextField = new TextField(document.body, 250);
  const maxValueTextField = new TextField(document.body, 175);
  const setCurrentRunningSum = (value: number) => {
    currentRunningSum = value;
    currentRunningSumTextField.text = "Current running sum: " + value;
  };
  const setMaxValue = (value: number) => {
    maxValue = value;
    maxValueTextField.text = "Max value: " + value;
  };
  setCurrentRunningSum(currentRunningSum);
  setMaxValue(maxValue);

  for (let i = 0; i < array.length - (SUBARRAY_LENGTH - 1); i++) {
    await alvis.changeColorsInRange(i, i + 2, "yellow", 500);
    let sum = 0;
    for (let j = i; j < i + SUBARRAY_LENGTH; j++) {
      sum += array[j];
    }
    setCurrentRunningSum(sum);
    await timeout(750);
    if (sum > maxValue) {
      setMaxValue(sum);
      maxValueTextField.color = "green";
      await alvis.changeColorsInRange(i, i + 2, "lightgreen", 500);
    } else {
      currentRunningSumTextField.color = "red";
      await alvis.changeColorsInRange(i, i + 2, "Tomato", 500);
    }
    await timeout(500);
    alvis.changeAllColors("white", 0);
    maxValueTextField.color = "black";
    currentRunningSumTextField.color = "black";
  }
};
