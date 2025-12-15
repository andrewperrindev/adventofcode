const {
    stringToCoordinates,
    upFrom,
    downFrom,
    leftFrom,
    rightFrom,
} = require('./coordinates');

module.exports = class Region {
    constructor(edgeCoords, edges = []) {
        this.edgeCoords = edgeCoords.map(stringToCoordinates);
        this.edges = edges;
    }

    static fromCornerCoordinates(cornerCoords) {
        const coords = cornerCoords.map(stringToCoordinates);
        let first = coords.shift();
        let second = coords.shift();
        const edgeCoords = [first];
        const edges = [];

        while (first && second) {
            edges.push([first, second]);
            while (first[0] !== second[0] || first[1] !== second[1]) {
                if (first[0] === second[0]) {
                    // vertical movement
                    if (first[1] < second[1]) {
                        first = downFrom(first);
                    } else {
                        first = upFrom(first);
                    }
                } else if (first[1] === second[1]) {
                    // horizontal movement
                    if (first[0] < second[0]) {
                        first = rightFrom(first);
                    } else {
                        first = leftFrom(first);
                    }
                }
                edgeCoords.push(first);
            }

            second = coords.shift();
        }

        return new Region(edgeCoords, edges);
    }

    static areaFromOppositeCorners(cornerA, cornerB) {
        const coordA = stringToCoordinates(cornerA);
        const coordB = stringToCoordinates(cornerB);

        const length = Math.abs(coordA[0] - coordB[0]) + 1;
        const width = Math.abs(coordA[1] - coordB[1]) + 1;

        return length * width;
    }

    static rectangleCornersFromOppositeCorners(cornerA, cornerB) {
        const coordA = stringToCoordinates(cornerA);
        const coordB = stringToCoordinates(cornerB);

        return [
            [coordA[0], coordA[1]],
            [coordA[0], coordB[1]],
            [coordB[0], coordB[1]],
            [coordB[0], coordA[1]],
        ];
    }

    static rectangeEdgesFromCorners(corners) {
        const [corner1, corner2, corner3, corner4] = corners;
        const minX = Math.min(corner1[0], corner2[0], corner3[0], corner4[0]);
        const maxX = Math.max(corner1[0], corner2[0], corner3[0], corner4[0]);
        const minY = Math.min(corner1[1], corner2[1], corner3[1], corner4[1]);
        const maxY = Math.max(corner1[1], corner2[1], corner3[1], corner4[1]);

        return [
            [[minX, maxY], [maxX, maxY]], // top
            [[maxX, minY], [maxX, maxY]], // right
            [[minX, minY], [maxX, minY]], // bottom
            [[minX, minY], [minX, maxY]], // left
        ];
    }

    isHorizontal(edge) {
        const [start, end] = edge;
        return start[1] === end[1];
    }

    isVertical(edge) {
        const [start, end] = edge;
        return start[0] === end[0];
    }

    contains(point) {
        const [x, y] = point;

        // Upper boundary
        let inside = this.edgeCoords.some((edgeCoord) => edgeCoord[0] === x && edgeCoord[1] <= y);
        // Lower boundary
        inside = inside && this.edgeCoords.some((edgeCoord) => edgeCoord[0] === x && edgeCoord[1] >= y);
        // Left boundary
        inside = inside && this.edgeCoords.some((edgeCoord) => edgeCoord[1] === y && edgeCoord[0] >= x);
        // Right boundary
        return inside && this.edgeCoords.some((edgeCoord) => edgeCoord[1] === y && edgeCoord[0] <= x);
    }
};
