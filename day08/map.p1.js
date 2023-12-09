/*
ADVENT OF CODE: Day 8, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let mapInput = [];

  try {
    // Read in the map info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('map.input.txt'), 'utf8');
    mapInput = data.split(EOL).reduce((prev, current) => {
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

  // List of directions is on the first line.
  const directions = mapInput.shift().split('');
  // Rest of the input is the map of locations; parse its contents.
  const map = parseMap(mapInput);

  // Use the directions and map to navigate from AAA to ZZZ.
  // Returns the number of steps it took.
  let stepCount = navigate(directions, map);

  console.log(`TOTAL: ${stepCount}`);
}

function navigate(directions, map) {
  let stepCount = 0;
  let location = 'AAA';

  // For each step, grab the next direction and navigate to
  // the location in that direction. Each direction gets pushed
  // back onto the end in case we need to repeat directions.
  // Continue until we reach the end location (ZZZ).
  while (location !== 'ZZZ') {
    stepCount++;
    const direction = directions.shift();
    directions.push(direction);
    location = map[location][direction];
    console.log(`${direction}: ${location}`);
  }

  return stepCount;
}

// Parse out the map into an object where each key is a location
// for easy lookup.
function parseMap(input) {
  return input.reduce((prev, current) => {
    const [location, destinations] = current.split('=');

    if (location && destinations) {
      const matches = destinations.match(/\(([A-Z]{3}), ([A-Z]{3})\)/);
      prev[location.trim()] = {
        L: matches[1],
        R: matches[2]
      };
    }

    return prev;
  }, {});
}

if (require.main === module) {
  main();
}