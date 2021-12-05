import { grokkingAlgoBFSExample } from "../../example-data/grokking-graph";
import {
  allNodesWeightedLetterExample,
  weightedLetterExample,
} from "../../example-data/weighted-letter-graph";
import { Graph } from "../../graph/graph";
import { Node } from "../../graph/node";
import { TextGrid } from "../../grid/text-grid";
import { Queue } from "../../queue/queue";
import { TextField } from "../../text-field/text-field";
import { addSmallTitle, addTitle, timeout } from "../../util";

export const dijkstrasAlgorithm = async () => {
  addTitle("Dijkstra's Algorithm");
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
  values[1][1] = "0";

  const container2 = document.createElement("div");
  container.appendChild(container2);
  const grid = new TextGrid(container2, values);
  grid.changeColorForColumn(0, "ivory");
  grid.changeColorForRow(0, "lightgrey");

  addSmallTitle("Unvisited");
  const unvisitedQueue = new Queue<{ text: string }>(
    document.body,
    allNodesWeightedLetterExample,
    {
      cellMaxAmount: 5,
    }
  );

  addSmallTitle("Visited");
  const visitedQueue = new Queue<{ text: string }>(document.body, [], {
    cellMaxAmount: 5,
  });

  const textField = new TextField(container2, grid.canvasWidth);

  // Start
  let node = graph.head;
  while (node.text !== "F") {
    // changeColorInQueueBasedOnText(unvisitedQueue, node.text, "lightgreen");

    node.allEdgeColors = "darkorange";
    for (const edge of node.edges) {
      edge.node.color = "yellow";
      const row = getRowValueFromNodeText(edge.node.text, grid);
      grid.changeColor(row, 1, "yellow");
      const parentNodeRow = getRowValueFromNodeText(node.text, grid);
      const parentValue = parseInt(grid.getText(parentNodeRow, 1));
      const edgeValue = edge.weight;
      const result = parentValue + edgeValue;
      const currentValue = grid.getText(row, 1);
      textField.color = "darkorange";
      await timeout(500);
      if (result > parseInt(currentValue)) {
        textField.text = `${parentValue} + ${edgeValue} = ${result} is not less than ${currentValue}`;
      } else {
        textField.text = `${parentValue} + ${edgeValue} = ${result} is less than ${currentValue}`;
        grid.setText(row, 1, `${parentValue} + ${edgeValue} = ${result}`);
        await timeout(1500);
        grid.setText(row, 1, result.toString());
        await timeout(2000);
        grid.setText(row, 2, node.text);
      }

      await timeout(2000);
      grid.changeColor(row, 1, "white");
      grid.changeColor(row, 2, "white");
      edge.node.color = "white";
      edge.color = "black";
      textField.text = "";
      await timeout(500);
    }
    node.color = "white";
    await unvisitedQueue.remove(
      findIndexInQueueBasedOnText(unvisitedQueue, node.text)
    );
    visitedQueue.enqueue(node);
    visitedQueue.changeAllColors("lightGreen");

    node = getUnvisitedNodeWithSmallestDistance(
      graph.getListOfNodes(),
      visitedQueue,
      grid
    );
    if (node.text === "F") {
      textField.text = `The unvisited node with the smallest distance is the final node. Stopping now`;
      break;
    }

    textField.text = `${node.text} is now the unvisited node with the smallest distance`;
    textField.color = "green";
    node.color = "lightgreen";
    const newNodeRow = getRowValueFromNodeText(node.text, grid);
    grid.changeColorForRow(newNodeRow, "lightgreen");
    await timeout(3000);
    grid.changeColorForRow(newNodeRow, "white");
  }
};

const getRowValueFromNodeText = (text: string, grid: TextGrid) => {
  return grid
    .getAllTextValues()
    .findIndex((values) => values.some((value) => value === text));
};

const getUnvisitedNodeWithSmallestDistance = (
  nodes: Node[],
  visitedQueue: Queue<{ text: string }>,
  grid: TextGrid
) => {
  const textValues = grid.getAllTextValues();
  textValues.shift();
  const sortedValues = textValues.sort((row1, row2) => {
    return parseInt(row1[1]) - parseInt(row2[1]);
  });
  const visitedValues = visitedQueue.actualArray.map((element) => element.text);
  const sortedUnvisitedValues = sortedValues.filter(
    (value) => !visitedValues.includes(value[0])
  );
  const value = sortedUnvisitedValues[0][0];
  const node = nodes.find((node) => node.text === value);
  if (!node) throw new Error(`Can't find node for value ${value}`);
  return node;
};

const findIndexInQueueBasedOnText = (
  queue: Queue<{ text: string }>,
  text: string
) => {
  return queue.actualArray.findIndex((value) => value.text === text);
};

const changeColorInQueueBasedOnText = (
  queue: Queue<{ text: string }>,
  text: string,
  color: string
) => {
  const index = findIndexInQueueBasedOnText(queue, text);
  queue.changeColor(index, color, 0);
};
