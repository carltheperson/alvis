import { weightedLetterExample } from "../../example-data/weighted-letter-graph";
import { Graph } from "../../graph/graph";
import { Node } from "../../graph/node";
import { TextGrid } from "../../grid/text-grid";
import { Queue } from "../../queue/queue";
import { TextField } from "../../text-field/text-field";
import { addSmallTitle, timeout } from "../../util";

const GRAPH = weightedLetterExample;
const GRAPH_NODES = GRAPH.allNodes;

enum Color {
  SELECTED_NODE = "dodgerBlue",
  SELECTED_TEXT = "darkBlue",
  SOMETHING_NOT_POSSIBLE = "grey",
  SOMETHING_BAD = "red",
  HIGHLIGHTED_NODE = "yellow",
  HIGHLIGHTED_EDGE = "darkorange",
  NORMAL_EDGE = "black",
  CLOSED_NODE = "lightgreen",
  BLANK = "white",
  HEADER = "lightgrey",
}

const HEADER_VALUES = ["Node", "Distance", "Parent"];

enum HeaderIndex {
  NODE = 0,
  DISTANCE = 1,
  PARENT = 2,
}

const QUEUE_STYLE = { cellMaxAmount: 5 };

const GRAPH_STYLE = {
  weightFontSize: 18,
  weightRecWidth: 30,
  textSize: 22,
  lineWidth: 3.5,
};

export const dijkstrasAlgorithm = async () => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "baseline";
  container.style.gap = "20px";
  document.body.appendChild(container);

  const graph = new Graph(container, GRAPH, GRAPH_STYLE);

  const values = [
    HEADER_VALUES,
    ...GRAPH_NODES.map((nodeText) => [nodeText.text, "∞", ""]),
  ];
  values[HeaderIndex.DISTANCE][1] = "0";

  const container2 = document.createElement("div");
  container.appendChild(container2);
  const grid = new TextGrid(container2, values);
  grid.changeColorForRow(0, "lightgrey");

  addSmallTitle("Open");
  const openQueue = new Queue<{ text: string }>(
    document.body,
    GRAPH_NODES.filter((el) => el.text != GRAPH.tail.text),
    QUEUE_STYLE
  );

  addSmallTitle("Closed");
  const closedQueue = new Queue<{ text: string }>(
    document.body,
    [],
    QUEUE_STYLE
  );

  const textField = new TextField(container2, grid.canvasWidth);

  let node = graph.head;
  openQueue.changeColor(0, Color.SELECTED_NODE);
  grid.changeColorForRow(1, Color.SELECTED_NODE);
  node.color = Color.SELECTED_NODE;
  await timeout(1500);

  while (openQueue.length !== 0) {
    const edgesLeadingToOpenNodes = node.edges.filter(
      (edge) =>
        findIndexInQueueBasedOnText(openQueue, edge.node.text) !== -1 ||
        edge.node.text === GRAPH.tail.text
    );
    edgesLeadingToOpenNodes.forEach(
      (edge) => (edge.color = Color.HIGHLIGHTED_EDGE)
    );
    node.edges
      .filter((edge) => !edgesLeadingToOpenNodes.includes(edge))
      .forEach((edge) => (edge.color = Color.SOMETHING_NOT_POSSIBLE));

    await timeout(1500);
    for (const edge of edgesLeadingToOpenNodes) {
      const oldColor = edge.node.color;

      edge.node.color = Color.HIGHLIGHTED_NODE;
      const row = getRowValueFromNodeText(edge.node.text, grid);
      grid.changeColorForRow(row, Color.HIGHLIGHTED_NODE);
      const parentNodeRow = getRowValueFromNodeText(node.text, grid);
      const parentValue = parseInt(
        grid.getText(parentNodeRow, HeaderIndex.DISTANCE)
      );
      const edgeValue = edge.weight;
      const result = parentValue + edgeValue;
      const currentValue = grid.getText(row, HeaderIndex.DISTANCE);
      await timeout(500);

      if (result > parseInt(currentValue)) {
        textField.color = Color.SOMETHING_BAD;
        textField.text = `${parentValue} + ${edgeValue} = ${result} is NOT less than ${currentValue}`;
      } else {
        textField.color = Color.HIGHLIGHTED_EDGE;
        textField.text = `${parentValue} + ${edgeValue} = ${result} is less than ${currentValue}`;
        grid.setText(
          row,
          HeaderIndex.DISTANCE,
          `${parentValue} + ${edgeValue} = ${result}`
        );
        await timeout(1500);
        grid.setText(row, HeaderIndex.DISTANCE, result.toString());
        await timeout(2000);
        grid.setText(row, HeaderIndex.PARENT, node.text);

        edge.node.color = oldColor;
      }

      await timeout(2000);
      grid.changeColorForRow(row, Color.BLANK);
      textField.text = "";
      await timeout(500);
    }
    node.color = Color.CLOSED_NODE;
    node.allEdgeColors = Color.NORMAL_EDGE;
    await openQueue.remove(findIndexInQueueBasedOnText(openQueue, node.text));
    closedQueue.enqueue(node);
    closedQueue.changeAllColors(Color.CLOSED_NODE);
    grid.changeColorForRow(
      getRowValueFromNodeText(node.text, grid),
      Color.CLOSED_NODE
    );

    await timeout(1250);

    if (openQueue.length === 0) {
      break;
    }

    // Picking new node
    node = getUnvisitedNodeWithSmallestDistance(
      graph.getListOfNodes(),
      openQueue,
      grid
    );
    textField.text = `${node.text} is now the open node with the smallest distance`;
    textField.color = Color.SELECTED_TEXT;
    node.color = Color.SELECTED_NODE;
    changeColorInQueueBasedOnText(openQueue, node.text, Color.SELECTED_NODE);
    const newNodeRow = getRowValueFromNodeText(node.text, grid);
    await timeout(3000);
    grid.changeColorForRow(newNodeRow, Color.SELECTED_NODE);
  }
  graph.getListOfNodes().find((node) => node.text === GRAPH.tail.text)!.color =
    Color.CLOSED_NODE;
  await timeout(3000);

  lightUpFinalPath(
    graph,
    grid,
    GRAPH_NODES.map((n) => n.text),
    GRAPH.tail.text
  );
};

const getRowValueFromNodeText = (text: string, grid: TextGrid) => {
  return grid
    .getAllTextValues()
    .findIndex((values) => values.some((value) => value === text));
};

const getUnvisitedNodeWithSmallestDistance = (
  nodes: Node[],
  unvisitedQueue: Queue<{ text: string }>,
  grid: TextGrid
) => {
  const textValues = grid.getAllTextValues();
  textValues.shift();
  const sortedValues = textValues.sort((row1, row2) => {
    return parseInt(row1[1]) - parseInt(row2[1]);
  });
  const unvisitedValues = unvisitedQueue.actualArray.map(
    (element) => element.text
  );
  const sortedUnvisitedValues = sortedValues.filter((value) =>
    unvisitedValues.includes(value[0])
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

const lightUpFinalPath = async (
  graph: Graph,
  grid: TextGrid,
  allNodeLetters: string[],
  finalNodeValue: string
) => {
  const nodes = graph.getListOfNodes();
  let node = nodes.find((node) => finalNodeValue === node.text);
  const gridValues = grid.getAllTextValues();
  while (node) {
    node.color = "dodgerBlue";
    const rowIndex = allNodeLetters.indexOf(node.text) + 1;
    const rowValues = gridValues[rowIndex];
    const parentValue = rowValues[2];
    grid.changeColor(rowIndex, 0, "dodgerBlue");
    const oldNode = node;
    node = nodes.find((node) => parentValue === node.text);
    if (node) {
      const connectingEdge = node.edges.find((edge) => edge.node === oldNode)!;
      await timeout(1000);
      grid.changeColor(rowIndex, 2, "DeepSkyBlue");
      connectingEdge.color = "blue";
    }
    await timeout(1500);
  }
};
