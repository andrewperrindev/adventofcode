const { openFile, readAsLines } = require('../utils/file-handler');

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.parent = this;
        this.componentSize = 1; // only accurate on the root
    }

    findRoot() {
        if (this.parent !== this) {
            this.parent = this.parent.findRoot();
        }
        return this.parent;
    }

    union(other) {
        let rootA = this.findRoot();
        let rootB = other.findRoot();

        if (rootA === rootB) {
            return false;
        }

        // Union by size: attach smaller tree under larger tree
        if (rootA.componentSize < rootB.componentSize) {
            const tmp = rootA;
            rootA = rootB;
            rootB = tmp;
        }

        rootB.parent = rootA;
        rootA.componentSize += rootB.componentSize;
        return true;
    }
}

const readInput = async () => {
    const data = await openFile('inputs/boxes.example.txt', __dirname);

    return readAsLines(data);
};

const createPoints = (lines) => {
    const points = [];

    lines.forEach((line) => {
        const [x1, y1, z1] = line.split(',').map(Number);
        points.push(new Point(x1, y1, z1));
    });

    return points;
};

const calculateDistancesForAllPairs = (points) => {
    const distances = [];
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dz = points[i].z - points[j].z;

            // For the purposes of this task, we don't need to do the sqrt
            const distance = dx * dx + dy * dy + dz * dz;
            distances.push([points[i], points[j], distance]);
        }
    }

    return distances;
};

const connectUntilSingleCircuit = (sortedDistances, points) => {
    // Start with N components (each point is its own circuit)
    let components = points.length;

    for (const [pointA, pointB] of sortedDistances) {
        // Only count connections that actually merge two different circuits
        const merged = pointA.union(pointB);
        if (!merged) continue;

        components -= 1;

        // The connection that reduces components to 1 is the last one needed
        if (components === 1) {
            return pointA.x * pointB.x;
        }
    }
};

const getResult = async () => {
    const data = await readInput();
    const points = createPoints(data);
    const distances = calculateDistancesForAllPairs(points);
    const sortedDistances = distances.sort((a, b) => a[2] - b[2]);
    return connectUntilSingleCircuit(sortedDistances, points);
}

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
