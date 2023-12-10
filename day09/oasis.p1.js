/*
ADVENT OF CODE: Day 9, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let oasisInput = [];

  try {
    // Read in the sensor info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('oasis.example.txt'), 'utf8');
    oasisInput = data.split(EOL).reduce((prev, current) => {
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

  // For this challenge, a recursive approach definitely seemed like the obvious approach.
  // However, I was curious how both recursive and iterative solutions would look, so I run the 
  // calculations twice (once for each method).

  // Convert strings to numbers
  const oasisInputNums = oasisInput.map((input) => input.split(/\s+/).map((num) => parseInt(num, 10)));

  let derivedValuesIterative = oasisInputNums.map((input) => getNextValue(input) + input.at(-1));
  console.log('ITERATIVE');
  console.log(derivedValuesIterative);
  console.log(`TOTAL ITERATIVE: ${derivedValuesIterative.reduce((prev, current) => prev + current, 0)}`);

  let derivedValuesRecursive = oasisInputNums.map((input) => getNextValueRecursive(input) + input.at(-1));
  console.log('RECURSIVE');
  console.log(derivedValuesRecursive);
  console.log(`TOTAL RECURSIVE: ${derivedValuesRecursive.reduce((prev, current) => prev + current, 0)}`);
}

// Iterative approach:
// While our list of diffs contains non-zero numbers,
// calculate a new row of differences and add the result
// to a list of difference rows.
// When we get all zeros, difference calcuations are complete,
// so use our saved rows to calculate the final result.
function getNextValue(readings) {
  let differences = [];
  let differenceList = [...readings];

  while (differenceList.some((item) => item !== 0)) {
    differenceList = getPrecedingValues(differenceList);
    differences.push([...differenceList]);
  }

  return processResults(differences);
}

// Recursive approach:
// Calculate the diff values for this row. If it contains
// non-zero values, call this same method with the new row of diffs.
// Return the previous result plus the end of the differences row.
// Base case is all zeros, in which case we return 0.
function getNextValueRecursive(readings) {
  let differences = getPrecedingValues([...readings]);

  if (differences.some((diff) => diff !== 0)) {
    let val = getNextValueRecursive(differences);
    // Uncomment to see recursion unwind and calculate values:
    // console.log(`${val}+${diffs.at(-1)}=${val+diffs.at(-1)}`);
    return val + differences.at(-1);
  }

  return 0;
}

// Calculate the diffs of the given row of values.
// This essentially generates the preceding row of values.
function getPrecedingValues(readings) {
  const result = [];
  let leftValue;
  let rightValue = readings.shift();

  while (readings.length > 0) {
    leftValue = rightValue;
    rightValue = readings.shift();

    result.push((rightValue - leftValue));
  }

  return result;
}

// The iterative method needs this helper to tally all the
// values from the calculatetd diffs.
function processResults(differences) {
  let prev = 0;
  while (differences.length > 0) {
    let list = differences.pop();
    let next = list.at(-1);
    // Uncomment to see values calculated iteratively:
    // console.log(`${prev}+${next}=${prev+next}`);
    prev += next;
  }
  return prev;
}

if (require.main === module) {
  main();
}