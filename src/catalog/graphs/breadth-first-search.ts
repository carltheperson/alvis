import { letterGraphExample } from "../../example-data/letter-graph";
import { Graph } from "../../graph/graph";
import { Node } from "../../graph/node";
import { Queue } from "../../queue/queue";
import { addTitle, timeout } from "../../util";

/*
O(V+E)T
O(V)S
*/
export const breadthFirstSearch = async () => {
  addTitle("Breadth-first search");

  const style = { cellMaxAmount: 10 };
  const queue = new Queue<Node>(document.body, [], style);

  const graph = new Graph(document.body, letterGraphExample, { padding: 70 });

  queue.enqueue(graph.head, 500);
  await timeout(500);

  const resultQueue = new Queue<Node>(document.body, [], style);
  while (queue.length !== 0) {
    const node = queue.getNextToDequeue();

    queue.nextToDequeueColor = "dodgerBlue";
    node.color = "dodgerBlue";

    node.allEdgeColors = "darkBlue";

    if (node.edges.length > 0) await timeout(500);
    for (const edge of node.edges) {
      edge.node.color = "yellow";
      queue.enqueue(edge.node, 1200, { color: "yellow" });
    }

    if (node.edges.length > 0) {
      await timeout(1600);
    } else await timeout(1000);

    node.allEdgeColors = "black";

    queue.nextToDequeueColor = "lightgreen";
    node.color = "white";
    await queue.dequeue(750);
    await resultQueue.enqueue(node, 750, { color: "lightgreen" });
    await timeout(500);
  }
};
