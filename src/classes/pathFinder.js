import { PriorityQueue } from './priorityQueue';

export class PathFinder {
  constructor(maze) {
    this.maze = maze;
  }

  heuristic(node, goal) {
    let dx = Math.abs(node.x - goal.x);
    let dy = Math.abs(node.y - goal.y);
    return dx + dy; // Using Manhattan distance as heuristic
  }

  aStarSearch(start, goal) {
    let frontier = new PriorityQueue();
    frontier.enqueue(start, 0);

    let cameFrom = {};
    let costSoFar = {};

    cameFrom[JSON.stringify(start)] = null;
    costSoFar[JSON.stringify(start)] = 0;

    while (!frontier.isEmpty()) {
      let current = frontier.dequeue();

      if (current.x === goal.x && current.y === goal.y) {
        break;
      }

      this.maze.getNeighbors(current.x, current.y).forEach((next) => {
        let newCost = costSoFar[JSON.stringify(current)] + 1;

        if (
          !costSoFar[JSON.stringify(next)] ||
          newCost < costSoFar[JSON.stringify(next)]
        ) {
          costSoFar[JSON.stringify(next)] = newCost;
          let priority = newCost + this.heuristic(next, goal);
          frontier.enqueue(next, priority);
          cameFrom[JSON.stringify(next)] = current;
        }
      });
    }

    // Constructing the path
    let current = goal;
    let path = [current];
    while (current.x !== start.x || current.y !== start.y) {
      current = cameFrom[JSON.stringify(current)];
      path.unshift(current);
    }
    return path;
  }
}