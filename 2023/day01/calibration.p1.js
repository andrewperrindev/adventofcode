/*
ADVENT OF CODE: Day 1, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let calibrationValues = [];

  try {
    // Read in the list of corrupted callibration values from an external
    // file, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('calibration.txt'), 'utf8');
    calibrationValues = data.split(EOL).reduce((prev, current) => {
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

  let total = 0;
  // For each corrupted callibration value, parse its two
  // numbers, log the result, and increment our final total.
  calibrationValues.forEach((value) => {
    const combined = resolveNumber(value);

    if (combined) {
      console.log(`For ${value}, result is ${combined}`);
      total += combined;
    }
  });

  console.log(`TOTAL: ${total}`);
}

function resolveNumber(input) {
  let first = null, last = null;

  input.split('').forEach((char) => {
    // If character is a number, we save it as the first
    // value if it's the first number we've seen. In every
    // case, we update the last value.
    let value = parseInt(char, 10);
    if (!isNaN(value)) {
      if (first == null) {
        first = value;
      }
      last = value;
    }
  });

  // If we successfully found a first & last value, log them
  // out and combine them into one number.
  if (first !== null && last !== null) {
    console.log(`For ${input}, first is ${first}, last is ${last}`);
    return parseInt(`${first}${last}`, 10);
  }

  return null;
}

if (require.main === module) {
  main();
}