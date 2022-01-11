import { breadthFirstSearch } from "./catalog/graphs/breadth-first-search";
import { depthFirstSearch } from "./catalog/graphs/depth-first-search";
import { dijkstrasAlgorithm } from "./catalog/graphs/dijkstras-algorithm";
import { maxSumFixedSubarray } from "./catalog/sliding-window/max-sum-fixed-subarray";
import { smallestSubArrayWithCondition } from "./catalog/sliding-window/smallest-subarray-with-condition";
import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";

const SELECT_TITLE = "Select algorithm";

const algorithms: Record<string, (c: HTMLDivElement) => any> = {
  "Select algorithm": () => null,
  "Bubble Sort": bubbleSort,
  "Intersection Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Breadth First Search": breadthFirstSearch,
  "Depth First Search": depthFirstSearch,
  "Dijkstra's Algorithm": dijkstrasAlgorithm,
  "Max sum of fixed-size subarray": maxSumFixedSubarray,
  "Smallest subarray meeting condition": smallestSubArrayWithCondition,
};

const select = document.createElement("select");
Object.keys(algorithms).forEach((key) => {
  const option = document.createElement("option");
  option.text = key;
  option.value = key;
  select.appendChild(option);
});

document.body.appendChild(select);

const container = document.createElement("div");
document.body.appendChild(container);

const current = localStorage.getItem("select");
if (current) {
  select.selectedIndex = Object.keys(algorithms).indexOf(current);
  algorithms[current](container);
}

select.addEventListener("change", (event) => {
  const value = (event.target as any).value;
  container.innerHTML = "";
  if (value === SELECT_TITLE) return;
  algorithms[value](container);
  localStorage.setItem("select", value);
});
