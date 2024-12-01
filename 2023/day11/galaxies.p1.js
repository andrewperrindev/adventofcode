/*
ADVENT OF CODE: Day 11, Part 1
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
  // Double empty rows/cols to account for expansion.
  expandUniverse(galaxies);
  galaxies.map((row) => console.log(row.join('')));

  // Get a list of galaxy locations.
  const galaxyCoords = findGalaxies(galaxies);

  // Find the distances between all pairs of galaxies.
  const pathLengths = calculatePathLengths(galaxyCoords);

  console.log(pathLengths);
  console.log(`TOTAL: ${pathLengths.reduce((prev, current) => prev + current, 0)}`);
}

function expandUniverse(galaxies) {
  // All "empty" rows should be doubled
  for (let rowIndex = 0; rowIndex < galaxies.length; rowIndex++) {
    const row = galaxies[rowIndex];
    if (row.every((block) => block === '.')) {
      const newRow = [...row];
      galaxies.splice(rowIndex, 0, newRow);
      // Extra increment to account for new row.
      rowIndex++;
    }
  }

  // All "empty" cols should be doubled
  for (let colIndex = 0; colIndex < galaxies[0].length; colIndex++) {
    const emptyCount = galaxies.reduce((prev, current) => current[colIndex] !== '.' ? prev + 1 : prev, 0);
    if (emptyCount === 0) {
      galaxies.forEach((item) => {
        item.splice(colIndex, 0, '.');
      });
      // Extra increment to account for new row.
      colIndex++;
    }
  }
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
function calculatePathLengths(coordinates) {
  const lengths = [];

  for (let start = 0; start < coordinates.length; start++) {
    for (let end = start + 1; end < coordinates.length; end++) {
      if (start !== end) {
        const [startX, startY] = coordinates[start];
        const [endX, endY] = coordinates[end];

        lengths.push(Math.abs(startX - endX) + Math.abs(startY - endY));
      }
    }
  }

  return lengths;
}

if (require.main === module) {
  main();
}