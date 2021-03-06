import { letterGraphExample } from "../../example-data/letter-graph";
import { Graph } from "../../graph/graph";
import { Queue } from "../../queue/queue";
import { Node } from "../../graph/node";
import { timeout } from "../../util";

export const depthFirstSearch = async (container: HTMLDivElement) => {
  const graph = new Graph(container, letterGraphExample, {
    textSize: 20,
    padding: 70,
    lineWidth: 4,
  });
  const visitedQueue = new Queue<Node>(container, [], {
    cellMaxAmount: 10,
    textSize: 20,
  });

  const visited: Record<string, boolean> = {};

  const traverse = async (node: Node) => {
    node.color = "dodgerBlue";
    await visitedQueue.enqueue(node, 750, { color: "lightGreen" });
    visited[node.text] = true;
    node.color = "lightGreen";
    for (const edge of node.edges) {
      if (visited[edge.node.text]) {
        edge.color = "grey";
        await timeout(1000);
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
  };

  await traverse(graph.head);
};
