/*
ADVENT OF CODE: Day 13, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let reflections = [];

  try {
    // Read in the reflection info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('reflections.example.txt'), 'utf8');
    reflections = data.split(EOL).reduce((prev, current) => {
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

  // Parse out each individual reflection grid so we can process each one
  const reflectInfo = parseReflections(reflections);

  const summary = reflectInfo.map((reflectGrid) => {
    reflectGrid.map((row) => console.log(row.join('')));

    // Find vertical or horizontal reflections
    const vertical = findReflectionVertical(reflectGrid);
    const horizontal = findReflectionHorizontal(reflectGrid);
  
    console.log(`VERTICAL - Index: ${vertical.index}; Count: ${vertical.count}`);
    console.log(`HORIZONTAL - Index: ${horizontal.index}; Count: ${horizontal.count}`);

    // Tally up the reflections with appropriate multipliers
    return (vertical.count * vertical.multiplier) + (horizontal.count * horizontal.multiplier);
  });

  console.log(`TOTAL: ${summary.reduce((prev, current) => prev + current, 0)}`);
}

// Parse mutliple reflection maps.
// End result of this is multiple array-of-arrays.
function parseReflections(reflections) {
  return reflections.reduce((prev, current) => {
    if (current.trim() === '') {
      prev.push([]);
    }
    else {
      prev.at(-1).push(current.split(''));
    }

    return prev;
  }, [[]]);
}

// Find two horizontal rows that are identical.
// Then VERIFY that it is a true reflection (all subsequent rows are also identical).
function findReflectionHorizontal(reflectGrid) {
  let prev, current;
  let result = {
    index: -1,
    count: 0,
    multiplier: 0
  };

  for (let yIndex = 0; yIndex < reflectGrid.length; yIndex++) {
    prev = current;
    current = reflectGrid[yIndex];

    if (prev && current && areArraysEqual(prev, current)) {
      const reflectRows = verifyReflectionHorizontal(yIndex - 1, yIndex, reflectGrid);
      if (reflectRows > 0) {
        result.index = yIndex;
        result.count = reflectRows;
        result.multiplier = 100;
        return result;
      }
    }
  }

  return result;
}

// Find two vertical columns that are identical.
// Then VERIFY that it is a true reflection (all subsequent columns are also identical).
// Opportunity for refactoring here, since this is similar to the horizontal version.
function findReflectionVertical(reflectGrid) {
  let prev, current;
  let result = {
    index: -1,
    count: 0,
    multiplier: 0
  };

  for (let xIndex = 0; xIndex < reflectGrid[0].length; xIndex++) {
    prev = current;
    current = getColumnArray(reflectGrid, xIndex);

    if (prev && current && areArraysEqual(prev, current)) {
      const reflectCols = verifyReflectionVertical(xIndex - 1, xIndex, reflectGrid);
      if (reflectCols > 0) {
        result.index = xIndex;
        result.count = reflectCols;
        result.multiplier = 1;
        return result;
      }
    }
  }

  return result;
}

// Verify a reflection by making sure all subsequent rows are equal.
// If we find rows that are different, return -1.
// Otherwise return number of identical rows.
function verifyReflectionHorizontal(upperIndex, lowerIndex, grid) {
  let count = lowerIndex;
  upperIndex--;
  lowerIndex++;

  while (upperIndex >= 0 && lowerIndex < grid.length) {
    if (!areArraysEqual(grid[upperIndex], grid[lowerIndex])) {
      return -1;
    }

    upperIndex--;
    lowerIndex++;
  }

  return count;
}

// Verify a reflection by making sure all subsequent columns are equal.
// If we find columns that are different, return -1.
// Otherwise return number of identical columns.
// Another opportunity for refactoring here.
function verifyReflectionVertical(leftIndex, rightIndex, grid) {
  let count = rightIndex;
  leftIndex--;
  rightIndex++;

  while (leftIndex >= 0 && rightIndex < grid[0].length) {
    if (!areArraysEqual(getColumnArray(grid, leftIndex), getColumnArray(grid, rightIndex))) {
      return -1;
    }

    leftIndex--;
    rightIndex++;
  }

  return count;
}

// Get column as an easily-addressable array
function getColumnArray(grid, column) {
  const result = [];

  for (let yIndex = 0; yIndex < grid.length; yIndex++) {
    result.push(grid[yIndex][column]);  
  }

  return result;
}

function areArraysEqual(array1, array2) {
  return array1.every((element, index) => {
    return element === array2[index];
  });
}

if (require.main === module) {
  main();
}