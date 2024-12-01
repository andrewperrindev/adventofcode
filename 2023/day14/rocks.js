/*
ADVENT OF CODE: Day 14, Part 2
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

  // Progress through a full N->W->S->E cycle of rotations 1000000000 times.
  const rocksSpun = spinCycle(rocks, 1000000000);
  rocksSpun.map((row) => console.log(row.join('')));

  console.log(`TOTAL: ${calculateLoad(rocksSpun)}`);
}

function spinCycle(rocks, spins) {
  // Keep track of load values we've seen previously.
  const loadSet = new Set();
  // Save a prediction if we detect a cycle.
  let prediction = -1;

  // Metadata to help detect a cycle in the rotations.
  // There's a lot going on here, and an obvious refactoring
  // would be to make this a class with functions to manage
  // its own data & calculations.
  const cycleMetadata = {
    // Previous data to help us detect a cycle.
    prevSpin: -1,
    prevLoad: -1,
    prevCycleLoads: [],

    // Spin number where we first detected a cycle.
    firstCycleSpin: -1,
    // Spin number where the most recent cycle started.
    lastCycleStart: -1,
    cycleLoads: [],
    // How many of the same cycle have we seen so far?
    totalDetectedCycles: 0,
  }

  for (let spin = 0; spin < spins; spin++) {
    // One full "spin" rotates the grid of rocks N->W->S->E
    rocks = shiftNorth(rocks);
    rocks = shiftWest(rocks);
    rocks = shiftSouth(rocks);
    rocks = shiftEast(rocks);

    const load = calculateLoad(rocks);
    if (load === prediction) {
      // If the load of the current grid of rocks matches our
      // prediction, return this grid. We're done.
      return rocks;
    }
    // If we don't have a prediction yet, see if this load value is one
    // we've seen before. If so, check for a cycle in the data.
    if (prediction < 0 && loadSet.has(load)) {
      // This metadata stuff should really be its own class. For now, taking
      // the middle ground and using `.call` so I can at least use `this` notation.
      prediction = updateCycleMetadata.call(cycleMetadata, spin, load, spins);
    }

    // Remember this load value for later.
    loadSet.add(load);
  }

  return rocks;
}

// `this` should reference a cycleMetadata object. See `spinCycle` function.
function updateCycleMetadata(spin, load, spins) {
  let prediction = -1;

  // If `prevSpin` was the spin prior to this one, it means we just saw
  // a repeated load value, so we might be in a cycle.
  if (this.prevSpin === spin - 1) {
    const cycleLength = this.cycleLoads.length;

    // If the current load value matches the first repeated load value we
    // encountered, we may have just completed a cycle.
    if (load === this.cycleLoads[0]) {
      // console.log(`Possible cycle completion, started at spin ${this.lastCycleStart}: ${JSON.stringify(this.cycleLoads)}`);

      // If our last cycle of load values matches the previous cycle, then we may be on to something!
      // Keep a tally to see how often this happens.
      if (areArraysEqual(this.prevCycleLoads, this.cycleLoads)) {
        this.totalDetectedCycles++;
      }
      // Values between cycles don't match. Not stable yet.
      // Reset and try again. Maybe this current cycle will be the start?
      else {
        this.totalDetectedCycles = 0;
        this.firstCycleSpin = this.lastCycleStart;
      }

      // We've seen the same cycle of load values repeat at least 5 times.
      // That's good enough to make a confident prediction.
      if (this.totalDetectedCycles >= 5) {
        console.log(`Cycle length: ${cycleLength}; Cycles started at spin: ${this.firstCycleSpin}`);

        // How many spins do we have left?
        const remainingSpins = spins - spin;
        // Where do we fall in the cycle if we repeat it for all remaining spins?
        const remainingCyclesRemainder = remainingSpins % cycleLength;
        // Survey says...
        prediction = this.cycleLoads[remainingCyclesRemainder - 1];

        // console.log(`Remaining spins: ${remainingSpins}, remaining cycles: ${remainingWholeCycles}, remainder: ${remainingCyclesRemainder}`);
        console.log(`PREDICTION: ${prediction}. Skipping approx ${remainingSpins} spins!`);
      }

      // This cycle is complete.
      // Mark this as the start of a new cycle.
      this.lastCycleStart = spin;
      // Save the load values from this cycle.
      this.prevCycleLoads = this.cycleLoads;
      // Reset. Note: first value of this cycle will be saved on the next spin.
      this.cycleLoads.length = 0;
    }
    // Not at the end of a cycle yet.
    else {
      // If no load values saved yet, add the previous load value.
      // This is necessary because we don't know we've started a cycle until we
      // see the second repeated load value.
      if (cycleLength === 0) {
        this.cycleLoads.push(this.prevLoad);
      }
      this.cycleLoads.push(load);
    }

    // If we've just stated a new cycle, we need to remember which spin started it.
    this.lastCycleStart = (this.lastCycleStart > 0) ? this.lastCycleStart : this.prevSpin;
  }
  // Last repeated load value wasn't the previous spin. Not in a cycle yet.
  // Reset our cycle trackers and try again.
  else {
    this.cycleLoads.length = 0;
    this.lastCycleStart = -1;
  }

  // Remember this spin & load value.
  this.prevSpin = spin;
  this.prevLoad = load;

  // Return our predicted final load value, or -1 if we don't have enough data for
  // a prediction yet.
  return prediction;
}

// Column operation.
// Slide all `O` rocks toward the top of the grid.
function shiftNorth(rocks) {
  for (let columnIndex = 0; columnIndex < rocks[0].length; columnIndex++) {
    const columnRockInfo = getColumnRockArrays(rocks, columnIndex);
    const newColumn = tiltRocksLeft(columnRockInfo);

    applyArrayToColumn(rocks, columnIndex, newColumn);
  }

  return rocks;
}

// Row operation.
// Slide all `O` rocks toward the left of the grid.
function shiftWest(rocks) {
  for (let rowIndex = 0; rowIndex < rocks.length; rowIndex++) {
    const rowRockInfo = getRowRockArrays(rocks, rowIndex);
    const newRow = tiltRocksLeft(rowRockInfo);

    rocks[rowIndex] = newRow;
  }

  return rocks;
}

// Column operation.
// Slide all `O` rocks toward the bottom of the grid.
function shiftSouth(rocks) {
  for (let columnIndex = 0; columnIndex < rocks[0].length; columnIndex++) {
    const columnRockInfo = getColumnRockArrays(rocks, columnIndex);
    const newColumn = tiltRocksRight(columnRockInfo);

    applyArrayToColumn(rocks, columnIndex, newColumn);
  }

  return rocks;
}

// Row operation.
// Slide all `O` rocks toward the right of the grid.
function shiftEast(rocks) {
  for (let rowIndex = 0; rowIndex < rocks.length; rowIndex++) {
    const rowRockInfo = getRowRockArrays(rocks, rowIndex);
    const newRow = tiltRocksRight(rowRockInfo);

    rocks[rowIndex] = newRow;
  }

  return rocks;
}

// Slides all `O` rocks to the left (aka start) of the array
function tiltRocksLeft(rockInfo) {
  return rockInfo.reduce((prev, current) => {
    for (let count = 0; count < current.rockCount; count++) {
      prev.push('O');
    }
    for (let count = 0; count < current.spaceCount; count++) {
      prev.push('.');
    }
    if (current.segmentBreak) {
      prev.push('#');
    }
    return prev;
  }, []);
}

// Slides all `O` rocks to the right (aka end) of the array
function tiltRocksRight(rockInfo) {
  return rockInfo.reduce((prev, current) => {
    for (let count = 0; count < current.spaceCount; count++) {
      prev.push('.');
    }
    for (let count = 0; count < current.rockCount; count++) {
      prev.push('O');
    }
    if (current.segmentBreak) {
      prev.push('#');
    }
    return prev;
  }, []);
}

// Instead of doing multiple iterations of arrays, do
// a single pass that builds information about the layout
// of the column. We can use this info later to build a modified
// array based on tilt direction.
function getColumnRockArrays(grid, columnIndex) {
  const result = [];
  let rockCount = 0, segmentLength = 0;

  for (let yIndex = 0; yIndex < grid.length; yIndex++) {
    const rock = grid[yIndex][columnIndex];
    [rockCount, segmentLength] = processRock(rock, result, rockCount, segmentLength);
  }

  if (segmentLength > 0) {
    result.push(getRowInfoObject(rockCount, segmentLength, false));
  }

  return result;
}

// Instead of doing multiple iterations of arrays, do
// a single pass that builds information about the layout
// of the row. We can use this info later to build a modified
// array based on tilt direction.
function getRowRockArrays(grid, rowIndex) {
  const result = [];
  let rockCount = 0, segmentLength = 0;

  for (let xIndex = 0; xIndex < grid[0].length; xIndex++) {
    const rock = grid[rowIndex][xIndex];
    [rockCount, segmentLength] = processRock(rock, result, rockCount, segmentLength);
  }

  if (segmentLength > 0) {
    result.push(getRowInfoObject(rockCount, segmentLength, false));
  }

  return result;
}

function processRock(rock, result, rockCount, segmentLength) {
  if (rock === '#') {
    result.push(getRowInfoObject(rockCount, segmentLength, true));
    rockCount = segmentLength = 0;
  }
  else {
    rockCount += (rock === 'O') ? 1 : 0;
    segmentLength++;
  }

  return [rockCount, segmentLength];
}

function getRowInfoObject(rockCount, segmentLength, segmentBreak) {
  return {
    rockCount,
    segmentLength,
    spaceCount: segmentLength - rockCount,
    segmentBreak,
  };
}

// "Load" in the context of this problem is the amount of "weight" on the 
// top/north end of the grid. Rocks at the top count for more, with a multiplier
// based on the row index.
function calculateLoad(rocks) {
  // Multiplier is based on grid height, aka array length
  const length = rocks.length;
  return rocks.reduce((prev, current, index) => {
    const rockCount = current.reduce((prev, current) => prev + (current === 'O' ? 1 : 0), 0);
    // Multiplier becomes less as we move down the grid
    return prev + (rockCount * (length - index));
  }, 0);
}

// Modify the column in a grid to match the provided array
function applyArrayToColumn(grid, columnIndex, columnArray) {
  for (let yIndex = 0; yIndex < grid.length; yIndex++) {
    grid[yIndex][columnIndex] = columnArray[yIndex];
  }
}

function areArraysEqual(array1, array2) {
  return array1.length === array2.length && 
    array1.every((element, index) => {
      return element === array2[index];
    });
}

if (require.main === module) {
  main();
}