/*
ADVENT OF CODE: Day 8, Part 2
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

  // Use the directions and map to navigate from **A locations to **Z.
  // For now, find how many steps it takes for each path.
  let promises = Object.keys(map).filter((location) => location.endsWith('A')).map((location) => {
    return new Promise((resolve) => {
      const directionsCopy = [...directions];
      resolve(navigate(directionsCopy, map, location));
    });
  });

  Promise.all(promises).then((steps) => {
    // It took some research to figure out a method to derive the total steps without
    // a brute force approach (which was proving to be much too inefficent).
    // Turns out all paths are repeating cycles, so calculating the `least common multiple` 
    // across all steps should work.

    // Find the LCM of all paths, which is where they synchronize.
    console.log(`TOTAL: ${lcmAll(steps)}`);
  });
}

function navigate(directions, map, location = 'AAA') {
  let stepCount = 0;

  // For each step, grab the next direction and navigate to
  // the location in that direction. Each direction gets pushed
  // back onto the end in case we need to repeat directions.
  // Continue until we reach an end location (**Z).
  while (!location.endsWith('Z')) {
    stepCount++;
    const direction = directions.shift();
    directions.push(direction);
    location = map[location][direction];
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

// gcd,lcm,lcmAll take from:
// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
const lcm = (a, b) =>  a / gcd(a, b) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

if (require.main === module) {
  main();
}