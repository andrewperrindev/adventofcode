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
            return;
        }

        // Union by size: attach smaller tree under larger tree
        if (rootA.componentSize < rootB.componentSize) {
            const tmp = rootA;
            rootA = rootB;
            rootB = tmp;
        }

        rootB.parent = rootA;
        rootA.componentSize += rootB.componentSize;
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

const createCircuits = (sortedDistances, numConnections) => {
    let count = 0;

    for (const [pointA, pointB] of sortedDistances) {
        if (count >= numConnections) {
            break;
        }

        pointA.union(pointB);

        count += 1;
    }
};

const getResult = async () => {
    const data = await readInput();
    const points = createPoints(data);
    const distances = calculateDistancesForAllPairs(points);
    const sortedDistances = distances.sort((a, b) => a[2] - b[2]);
    createCircuits(sortedDistances, 1000);

    // Compute component sizes by root
    const sizeByRoot = new Map();
    for (const p of points) {
        const r = p.findRoot();
        sizeByRoot.set(r, (sizeByRoot.get(r) ?? 0) + 1);
    }

    const sizes = Array.from(sizeByRoot.values()).sort((a, b) => b - a);
    return sizes[0] * sizes[1] * sizes[2];
}

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
