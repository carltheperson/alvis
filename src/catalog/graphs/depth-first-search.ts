import { letterGraphExample } from "../../example-data/letter-graph";
import { Graph } from "../../graph/graph";
import { Queue } from "../../queue/queue";
import { Node } from "../../graph/node";
import { timeout } from "../../util";
import { BFSExample } from "../../example-data/bfs-example";
import { grokkingAlgoBFSExample } from "../../example-data/grokking-graph";
import { videoGraphExample } from "../../example-data/video-short-example";

export const depthFirstSearch = async (container: HTMLDivElement) => {
  const graph = new Graph(container, letterGraphExample, {
    textSize: 20,
    padding: 70,
    lineWidth: 4,
  });
  const resultQueue = new Queue<Node>(container, [], {
    cellMaxAmount: 10,
    textSize: 20,
  });

  const visited: Record<string, boolean> = {};

  const traverse = async (node: Node) => {
    node.color = "dodgerBlue";
    await resultQueue.enqueue(node, 750, { color: "lightGreen" });
    visited[node.text] = true;
    node.color = "lightGreen";
    for (const edge of node.edges) {
      if (visited[edge.node.text]) {
        await timeout(250);
        edge.color = "grey";
        continue;
      }
      await timeout(500);
      edge.color = "green";
      await traverse(edge.node);
    }
  };

  await traverse(graph.head);
};
