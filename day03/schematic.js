/*
ADVENT OF CODE: Day 3, Part 2
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let schematic = [];

  try {
    // Read in the schematic, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('schematic.txt'), 'utf8');
    schematic = data.split(EOL).reduce((prev, current) => {
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
  let prevLine = '', currentLine = '', nextLine = '';

  // Iterate over the schematic lines.
  // Total the found gear ratios together.
  for (let line = 0; line < schematic.length; line++) {
    currentLine = schematic[line];
    nextLine = (line + 1 < schematic.length) ? schematic[line + 1] : '';

    console.log(`Checking ${currentLine}`);

    const gearRatios = findGearRatios(currentLine, prevLine, nextLine);

    if (gearRatios && gearRatios.length > 0) {
      console.log(`Found gear ratios: ${JSON.stringify(gearRatios)}`);
      total += gearRatios.reduce((prev, current) => prev + current, 0);
    }
    else {
      console.log('No numbers found.');
    }

    prevLine = currentLine;
  }

  console.log(`TOTAL: ${total}`);
}

function findGearRatios(line, prevLine, nextLine) {
  let result = [];

  // Find the location of the first gear (*) on the line.
  let gearIndex = line.indexOf('*');

  while (gearIndex > -1) {
    let gearNumbers = [];

    // Calculate the indices we'll use to find adjacent numbers.
    // Start & end are basically one slot before & after the gear.
    // But, we need to make sure we're not going past the start or end of a line.
    let startIndex = gearIndex;
    if (startIndex > 0) {
      startIndex--;
    }
    let endIndex = gearIndex;
    if (endIndex < line.length - 1) {
      endIndex++;
    }
  
    // First check for a number left & right
    gearNumbers = gearNumbers.concat(getNumbers(line, startIndex, endIndex));

    // Check previous line for numbers
    gearNumbers = gearNumbers.concat(getNumbers(prevLine, startIndex, endIndex));

    // Check next line for numbers
    gearNumbers = gearNumbers.concat(getNumbers(nextLine, startIndex, endIndex));

    // If we found exactly two numbers, we can calculate this gear's ratio.
    if (gearNumbers.length == 2) {
      const gearRatio = gearNumbers.reduce((prev, current) => prev * current, 1);
      console.log(`Gear at index ${gearIndex} has part numbers ${JSON.stringify(gearNumbers)} with ratio ${gearRatio}`);
      result.push(gearRatio);
    }
    else {
      console.log(`Gear at index ${gearIndex} doesn't have a ratio. Part numbers: ${JSON.stringify(gearNumbers)}`);
    }

    // Find the next gear on this line, if we're not already at the end of the line.
    if (endIndex !== line.length - 1) {
      gearIndex = line.indexOf('*', endIndex);
    }
    else {
      gearIndex = -1;
    }
  }

  return result;
}

function getNumbers(line, startIndex, endIndex) {
  const result = [];

  // There are basically four scenarios we need to check for:
  // 1.2 - Two numbers separated by a symbol
  // 12. - Two adjacent numbers at the start
  // .12 - Two adjacent numbers at the end
  // 123 - All numbers
  // In all but the first case, there is only one number to parse.
  // Thus, these conditions only parse one number unless we detect
  // the first scenario.

  if (line) {
    const startHasNumber = /[0-9]/.test(line[startIndex]);
    const middleHasSymbol = /[^0-9]/.test(line[startIndex + 1]);
    const endHasNumber = /[0-9]/.test(line[endIndex]);

    if (middleHasSymbol || startHasNumber) {
      if (line[startIndex].match(/[0-9]/)) {
        result.push(getFullNumber(line, startIndex));
      }
    }
    if (middleHasSymbol || (endHasNumber && !startHasNumber)) {
      if (line[endIndex].match(/[0-9]/)) {
        result.push(getFullNumber(line, endIndex));
      }
    }
  }

  return result;
}

// Given a string and index, parse the full number located at index.
// This index could be at any spot in the number.
// Decrement until we find the start of the number, or reaech the start of line.
// Increment until we find the end of the number, or reach end of line.
function getFullNumber(string, index) {
  let startIndex = index;
  while (startIndex - 1 >= 0 && string[startIndex - 1].match(/[0-9]/)) {
    startIndex--;
  }

  let endIndex = index;
  while (endIndex < string.length && string[endIndex].match(/[0-9]/)) {
    endIndex++;
  }

  return parseInt(string.substring(startIndex, endIndex), 10);
}

if (require.main === module) {
  main();
}