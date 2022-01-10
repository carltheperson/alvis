import { BFSExample } from "../../example-data/bfs-example";
import { Graph } from "../../graph/graph";
import { Node } from "../../graph/node";
import { Queue } from "../../queue/queue";
import { timeout } from "../../util";

/*
O(V+E)T
O(V)S
*/
export const breadthFirstSearch = async () => {
  const style = { cellMaxAmount: 10, textSize: 20 };
  const queue = new Queue<Node>(document.body, [], style);

  const graph = new Graph(document.body, BFSExample, {
    padding: 70,
    lineWidth: 4,
    textSize: 20,
  });

  const visited: Record<string, boolean> = {};

  queue.enqueue(graph.head, 500);
  await timeout(500);

  const resultQueue = new Queue<Node>(document.body, [], style);
  while (queue.length !== 0) {
    const node = queue.getNextToDequeue();

    queue.nextToDequeueColor = "dodgerBlue";
    node.color = "dodgerBlue";

    node.allEdgeColors = "darkBlue";

    if (node.edges.length > 0) await timeout(250);

    const edges = node.edges.filter((n) => !visited[n.node.text]);
    for (const edge of edges) {
      edge.node.color = "yellow";
      queue.enqueue(edge.node, 750, { color: "yellow" });
      visited[edge.node.text] = true;
    }

    if (edges.length > 0) {
      await timeout(1600);
    } else await timeout(500);

    node.allEdgeColors = "black";

    queue.nextToDequeueColor = "lightgreen";
    node.color = "lightgreen";
    await queue.dequeue(750);
    await resultQueue.enqueue(node, 750, { color: "lightgreen" });
    await timeout(500);
  }
};
