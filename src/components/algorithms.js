import { accessible } from "./blocks/index";
import { emit } from "./events";

/**
 * The distance between two positions in 2-dimensional space
 * @param a
 * @param b
 */
export function distance(a, b) {
    return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
};

/**
 * A container that holds it's items always sorted by
 * a `priority` attribute.
 */
export class PriorityQueue {
    constructor() {
        this.clear();
    }

    /**
     * Put item into queue. Will be sorted automatically.
     * @param item The item to put in
     * @param priority Item priority (smaller is more important)
     */
    put(item, priority) {
        this.queue.unshift({item: item, priority: priority});
        this.queue.sort((a, b) => {
            return a.priority - b.priority
        });
    }

    /**
     * Return the most important item and simultaneously remove
     * it from the queue.
     * @returns {*}
     */
    pop() {
        var item = this.queue.splice(0, 1);
        return item[0].item;
    }

    empty() {
        return this.queue.length === 0;
    }

    clear() {
        this.queue = [];
    }

};

/**
 * An implementation of the A* algorithm for finding the
 * optimal path between two points (if there is one)
 */
class _AStar {
    constructor() {
        this.frontier = new PriorityQueue();
    }

    // Creates a (pseudo) hash for a cell
    hash(map, cell) {
        return ((cell.y + 1) * map.length) + (cell.x + 1);
    }

    // Return all accessible neighours of a cell (no diagonal movements
    // allowed)hhh
    getNeighbours(map, cell) {
        var result = [];

        if (accessible(map[cell.y][cell.x - 1])) { result.unshift({y: cell.y, x: cell.x - 1}) }
        if (accessible(map[cell.y][cell.x + 1])) { result.unshift({y: cell.y, x: cell.x + 1}) }
        if (accessible(map[cell.y + 1][cell.x])) { result.unshift({y: cell.y + 1, x: cell.x}) }
        if (accessible(map[cell.y - 1][cell.x])) { result.unshift({y: cell.y - 1, x: cell.x}) }

        return result;
    }

    replayPath(map, cameFrom, start, goal) {
        var current = goal;
        var path = [current];
        var done = false;

        while (!done) {
            if (current.x === start.x && current.y === start.y) {
                done = true;
            } else {
                current = cameFrom[this.hash(map, current)];
                path.unshift(current);
            }
        }

        return path;

    }

    calculatePath(map, start, goal) {
        var finished = false;
        this.frontier.put(start, 0);

        var costSoFar = {};
        var cameFrom = {};

        costSoFar[this.hash(map, start)] = 0;

        while (!this.frontier.empty() && !finished) {
            let current = this.frontier.pop();

            if (current.x == goal.x && current.y == goal.y) {
                finished = true;
            } else {
                var neighbours = this.getNeighbours(map, current);
                neighbours.forEach((next) => {
                    let nextId = this.hash(map, next);
                    let currentId = this.hash(map, current);

                    let newCost = costSoFar[currentId] + 1;

                    if (costSoFar[nextId] === undefined || (newCost < costSoFar[nextId])) {

                        costSoFar[nextId] = newCost;
                        let priority = newCost + distance({
                                x: goal.x, y: goal.y
                            }, {
                                x: next.x, y: next.y
                            });

                        this.frontier.put(next, priority);
                        cameFrom[nextId] = current;
                    }
                });
            }
        }

        this.frontier.clear();
        if (finished) {
            return this.replayPath(map, cameFrom, start, goal);
        } else {
            return null;
        }
    }
};

export var AStar = new _AStar();