import { letterGraphExample } from "../../example-data/letter-graph";
import { Graph } from "../../graph/graph";
import { Queue } from "../../queue/queue";
import { Node } from "../../graph/node";
import { timeout } from "../../util";

export const depthFirstSearch = async () => {
  const graph = new Graph(document.body, letterGraphExample, {
    textSize: 20,
    padding: 70,
    lineWidth: 4,
  });
  const resultQueue = new Queue<Node>(document.body, [], {
    cellMaxAmount: 10,
    textSize: 20,
  });

  const traverse = async (node: Node) => {
    node.color = "lightGreen";
    await resultQueue.enqueue(node, 750, { color: "lightGreen" });
    for (const edge of node.edges) {
      await timeout(500);
      edge.color = "green";
      await traverse(edge.node);
    }
  };

  await traverse(graph.head);
};
