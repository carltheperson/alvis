import { breadthFirstSearch } from "./catalog/graphs/breadth-first-search";
import { depthFirstSearch } from "./catalog/graphs/depth-first-search";
import { dijkstrasAlgorithm } from "./catalog/graphs/dijkstras-algorithm";
import { topologicalSort } from "./catalog/graphs/topological-sort";
import { binarySearch } from "./catalog/search/binary-search";
import { maxSumFixedSubarray } from "./catalog/sliding-window/max-sum-fixed-subarray";
import { smallestSubArrayWithCondition } from "./catalog/sliding-window/smallest-subarray-with-condition";
import { bubbleSort } from "./catalog/sorting/bubble-sort";
import { insertionSort } from "./catalog/sorting/insertion-sort";
import { selectionSort } from "./catalog/sorting/selection-sort";
import { getAlgorithmKeyFromUrl, setAlgorithmKeyInUrl } from "./util";

const algorithms: Record<string, [string, (c: HTMLDivElement) => any]> = {
  "": ["-- Select Algorithm --", () => null],
  bsrt: ["Bubble Sort", bubbleSort],
  isrt: ["Insertion Sort", insertionSort],
  ssrt: ["Selection Sort", selectionSort],
  bs: ["Binary Search", binarySearch],
  bfs: ["Breadth-First Search", breadthFirstSearch],
  dfs: ["Depth-First Search", depthFirstSearch],
  tsrt: ["Topological Sort", topologicalSort],
  da: ["Dijkstra's Algorithm", dijkstrasAlgorithm],
  mxfxs: ["Max Sum of Fixed-Size Subarray", maxSumFixedSubarray],
  smlcon: [
    "Smallest Subarray Meeting Condition",
    smallestSubArrayWithCondition,
  ],
};

const select = document.createElement("select");
Object.keys(algorithms).forEach((key) => {
  const option = document.createElement("option");
  option.text = algorithms[key][0];
  option.value = key;
  select.appendChild(option);
});

document.body.appendChild(select);

const container = document.createElement("div");
document.body.appendChild(container);

const current = getAlgorithmKeyFromUrl() ?? localStorage.getItem("select");
if (current) {
  select.selectedIndex = Object.keys(algorithms).indexOf(current);
  algorithms[current][1](container);
}

select.addEventListener("change", (event) => {
  const key = (event.target as any).value;
  container.innerHTML = "";
  if (key === "") return;
  algorithms[key][1](container);
  setAlgorithmKeyInUrl(key);
  localStorage.setItem("select", key);
});
