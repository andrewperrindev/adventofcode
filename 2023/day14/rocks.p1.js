/*
ADVENT OF CODE: Day 14, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let rocks = [];

  try {
    // Read in the rock info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('rocks.example.txt'), 'utf8');
    rocks = data.split(EOL).reduce((prev, current) => {
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

  rocks = rocks.map((row) => row.split(''));
  rocks.map((row) => console.log(row.join('')));
  console.log('\n');

  const rocksNorth = shiftNorth(rocks);
  rocksNorth.map((row) => console.log(row.join('')));

// "Load" in the context of this problem is the amount of "weight" on the 
// top/north end of the grid. Rocks at the top count for more, with a multiplier
// based on the row index.
const load = rocksNorth.reduce((prev, current, index) => {
    const length = rocksNorth.length;
    const rockCount = current.reduce((prev, current) => prev + (current === 'O' ? 1 : 0), 0);
    // Multiplier becomes less as we move down the grid
    return prev + (rockCount * (length - index));
  }, 0);

  console.log(`TOTAL: ${load}`);
}

// For each column in the grid, shift `O` rocks to the top (aka north)
function shiftNorth(rocks) {
  for (let columnIndex = 0; columnIndex < rocks[0].length; columnIndex++) {
    const column = getColumnArray(rocks, columnIndex);
    // console.log(column.join(''));

    const newColumn = shiftRocksFront(column);
    // console.log(newColumn.join('') + '\n');

    applyArrayToColumn(rocks, columnIndex, newColumn);
  }

  return rocks;
}

function shiftRocksFront(rockArray) {
  const shifted = [];
  const spaces = [];

  // Build a new array where `O` rocks are shifted as far to the
  // front of the array as possible. `#` rocks are fixed.
  while (rockArray.length > 0) {
    const rock = rockArray.shift();

    if (rock === '.') {
      // Save empty spaces for later.
      spaces.push(rock);
    }
    else if (rock === 'O') {
      // Immediately add `O` rocks
      shifted.push(rock);
    }
    else if (rock === '#') {
      // Fixed rock. Output our saved spaces & fixed rock.
      shifted.push(...spaces);
      spaces.length = 0;
      shifted.push('#');
    }
  }

  // Add any trailing spaces leftover.
  shifted.push(...spaces);

  return shifted;
}

// Return a column as a proper array for easier processing
function getColumnArray(grid, columnIndex) {
  const result = [];

  for (let yIndex = 0; yIndex < grid.length; yIndex++) {
    result.push(grid[yIndex][columnIndex]);  
  }

  return result;
}

// Modify the column in a grid to match the provided array
function applyArrayToColumn(grid, columnIndex, columnArray) {
  for (let yIndex = 0; yIndex < grid.length; yIndex++) {
    grid[yIndex][columnIndex] = columnArray[yIndex];
  }
}

if (require.main === module) {
  main();
}