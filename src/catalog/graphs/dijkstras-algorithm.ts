import { grokkingAlgoBFSExample } from "../../example-data/grokking-graph";
import {
  allNodesWeightedLetterExample,
  weightedLetterExample,
} from "../../example-data/weighted-letter-graph";
import { Graph } from "../../graph/graph";
import { TextGrid } from "../../grid/text-grid";

export const dijkstrasAlgorithm = async () => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "baseline";
  container.style.gap = "20px";
  document.body.appendChild(container);

  const graph = new Graph(container, weightedLetterExample, {
    weightFontSize: 18,
    weightRecWidth: 30,
    textSize: 22,
  });

  const values = [
    ["Node", "Distance", "Parent"],
    ...allNodesWeightedLetterExample.map((nodeText) => [
      nodeText.text,
      "∞",
      "",
    ]),
  ];

  const grid = new TextGrid(container, values);
  grid.changeColorForColumn(0, "ivory");
  grid.changeColorForRow(0, "lightgrey");
};
