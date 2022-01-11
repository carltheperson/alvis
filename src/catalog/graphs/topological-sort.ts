import { letterGraphExample } from "../../example-data/letter-graph";
import { Graph } from "../../graph/graph";
import { Node } from "../../graph/node";
import { timeout } from "../../util";
import { ReverseQueue } from "../../queue/reverse-queue";

export const topologicalSort = async (container: HTMLDivElement) => {
  const graph = new Graph(container, letterGraphExample, {
    textSize: 20,
    padding: 70,
    lineWidth: 4,
  });

  const sequence = new ReverseQueue<Node>(container, [], {
    cellMaxAmount: 10,
    textSize: 20,
  });

  const visited: Record<string, boolean> = {};

  const traverse = async (node: Node) => {
    node.color = "dodgerBlue";
    await timeout(500);
    visited[node.text] = true;
    node.color = "lightGreen";
    for (const edge of node.edges) {
      if (visited[edge.node.text]) {
        edge.color = "grey";
        await timeout(750);
        continue;
      }
      await timeout(500);
      edge.color = "green";

      await traverse(edge.node);

      await timeout(400);
      node.color = "LightSeaGreen";
      await timeout(700);
      node.color = "lightGreen";
    }
    await sequence.enqueue(node, 500, { color: "lightGreen" });
  };

  await traverse(graph.head);

  await timeout(1500);
  for (const node of sequence.actualArray) {
    node.color = "yellow";
    sequence.changeColor(sequence.actualArray.indexOf(node), "yellow");
    node.allEdgeColors = "orange";
    await timeout(1500);
  }
};
