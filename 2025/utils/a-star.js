const aStar = (start, goal, heuristic, getNeighbors) => {
    const goalStr = goal.toString();
    const startStr = start.toString();

    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    const openSet = new PriorityQueue();
    openSet.push(startStr, heuristic(start));

    const gScore = {};
    gScore[startStr] = 0;

    const fScore = {};
    fScore[startStr] = heuristic(start);

    while (openSet.isNotEmpty) {
        const currentStr = openSet.pop();
        const current = currentStr.split(',').map(Number);

        // If we reached the goal, reconstruct the path
        if (currentStr === goalStr) {
            return gScore[currentStr];
        }

        for (const neighbor of getNeighbors(current)) {
            const neighborStr = neighbor.toString();

            // TODO: Support per-neighbor costs
            const cost = 1;

            // Tentative gScore is the distance from start to the neighbor through current
            const tentativeGScore = gScore[currentStr] + cost;
            const neighborGScore = gScore[neighborStr] ?? Infinity;

            if (tentativeGScore < neighborGScore) {
                gScore[neighborStr] = tentativeGScore;
                fScore[neighborStr] = tentativeGScore + heuristic(neighbor);
                openSet.push(neighborStr, fScore[neighborStr]);
            }
        }
    }

    return Infinity; // Return infinity if there is no path
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    findIndex(element) {
        return this.elements.findIndex(e => e.element === element);
    }

    push(element, priority) {
        const index = this.findIndex(element);
        if (index !== -1) {
            // If the element is already in the queue, update its priority if the new one is lower
            if (this.elements[index].priority > priority) {
                this.elements[index].priority = priority;
            }
        } else {
            this.elements.push({ element, priority });
        }
    }

    pop() {
        let lowestIndex = 0;
        for (let i = 1; i < this.elements.length; i++) {
            if (this.elements[i].priority < this.elements[lowestIndex].priority) {
                lowestIndex = i;
            }
        }
        return this.elements.splice(lowestIndex, 1)[0].element;
    }

    get isEmpty() {
        return this.elements.length === 0;
    }

    get isNotEmpty() {
        return !this.isEmpty;
    }
}

module.exports = { aStar };
