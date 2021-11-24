import { letterGraphExample } from "../../example-data/letter-graph";
import { Graph } from "../../graph/graph";
import { Queue } from "../../queue/queue";
import { Node } from "../../graph/node";
import { addTitle, timeout } from "../../util";

export const depthFirstSearch = async () => {
  addTitle("Depth-first search");

  const graph = new Graph(document.body, letterGraphExample, {
    padding: 70,
    lineWidth: 4.5,
  });
  const resultQueue = new Queue<Node>(document.body, [], { cellMaxAmount: 10 });

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
