/*
ADVENT OF CODE: Day 11, Part 2
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let galaxies = [];

  try {
    // Read in the galaxy info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('galaxies.example.txt'), 'utf8');
    galaxies = data.split(EOL).reduce((prev, current) => {
      prev.push(current);
      return prev;
    }, []);
  }
  catch(err) {
    if (err) {
      console.error(err);
      return;
    }
  }

  galaxies = galaxies.map((row) => row.split(''));

  // For PART 2, this doesn't do any physical modification of the arrays,
  // but instead returns a map with locations of empty rows & cols.
  let emptySpaces = expandUniverse(galaxies);
  galaxies.map((row) => console.log(row.join('')));

  // Get a list of galaxy locations.
  const galaxyCoords = findGalaxies(galaxies);

  // Find the distances between all pairs of galaxies.
  const pathLengths = calculatePathLengths(galaxyCoords, emptySpaces);

  console.log(pathLengths);
  console.log(`TOTAL: ${pathLengths.reduce((prev, current) => prev + current, 0)}`);
}

// PART 2: Instead of physically altering the arrays, instead keep track of which
// rows and cols are empty. Coordinates will be dynamically shifted later.
function expandUniverse(galaxies) {
  let emptySpaces = {
    rows: [],
    cols: []
  };

  // Find empty rows and save their location for later.
  for (let rowIndex = 0; rowIndex < galaxies.length; rowIndex++) {
    const row = galaxies[rowIndex];
    if (row.every((block) => block === '.')) {
      emptySpaces.rows.push(rowIndex);
    }
  }

  // Find empty cols and save their location for later.
  for (let colIndex = 0; colIndex < galaxies[0].length; colIndex++) {
    const emptyCount = galaxies.reduce((prev, current) => current[colIndex] !== '.' ? prev + 1 : prev, 0);
    if (emptyCount === 0) {
      emptySpaces.cols.push(colIndex);
    }
  }

  return emptySpaces;
}

function findGalaxies(galaxies) {
  return galaxies.reduce((prev, current, y) => {
    // Find each galaxy in this row.
    // Add its coordinates to a list of galaxies in this row.
    let coords = current.reduce((prev, current, x) => {
      if (current === '#') {
        return [...prev, [x, y]];
      }
      return prev;
    }, []);

    // Add this row's galaxies to the full list.
    return prev.concat(coords);
  }, []);
}

// Find the shortest path between each unique pair of galaxies.
// "Shortest path" length happens to be the difference of 
// x & y coordinates summed together.
function calculatePathLengths(coordinates, emptySpaces) {
  const lengths = [];

  for (let start = 0; start < coordinates.length; start++) {
    for (let end = start + 1; end < coordinates.length; end++) {
      if (start !== end) {
        // PART 2: Dynamically modify the coordinates to account for expansion.
        const [startX, startY] = applyExpansion(coordinates[start], emptySpaces);
        const [endX, endY] = applyExpansion(coordinates[end], emptySpaces);

        lengths.push(Math.abs(startX - endX) + Math.abs(startY - endY));
      }
    }
  }

  return lengths;
}

// PART 2: For each x & y coordinate, add 1 million for each empty row
// that comes before the coordinate.
function applyExpansion(coords, emptySpaces) {
  let [x, y] = coords;

  let count = emptySpaces.cols.reduce((prev, current) => x > current ? prev + 1 : prev, 0);
  x = (x - count) + (1000000 * count);

  count = emptySpaces.rows.reduce((prev, current) => y > current ? prev + 1 : prev, 0);
  y = (y - count) + (1000000 * count);

  return [x, y];
}

if (require.main === module) {
  main();
}