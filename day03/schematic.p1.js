/*
ADVENT OF CODE: Day 3, Part 1
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
  // Total the found part numbers together.
  for (let line = 0; line < schematic.length; line++) {
    currentLine = schematic[line];
    nextLine = (line + 1 < schematic.length) ? schematic[line + 1] : '';

    console.log(`Checking ${currentLine}`);

    const numbers = findPartNumbers(currentLine, prevLine, nextLine);

    if (numbers && numbers.length > 0) {
      console.log(`Found part numbers: ${JSON.stringify(numbers)}`);
      total += numbers.reduce((prev, current) => prev + current, 0);
    }
    else {
      console.log('No part numbers found.');
    }

    prevLine = currentLine;
  }

  console.log(`TOTAL: ${total}`);
}

function findPartNumbers(line, prevLine, nextLine) {
  let result = [];

  // Use a regular expression to find all numbers on this line.
  const numbers = line.match(/[0-9]+/g);

  // For each found number, see if there is an adjacent symbol.
  numbers.forEach((number) => {
    let valid = false;
    
    // Use a regular expression to find the index of this number.
    // A regular expression is used here to ensure we match the exact
    // number we're looking for, and not accidentally match part of a
    // larger number.
    // One obvious refactoring here would be to grab both the numbers AND
    // their indexes in one pass, but for the purposes of this limited use
    // case, I'm keeping this method.
    let numberRegEx = new RegExp(`([^0-9]|^)${number}([^0-9]|$)`);
    let startIndex = line.search(numberRegEx);

    // We're using three indicees here:
    // startIndex: the beginning of our search for a symbol.
    // index: the start of the number on the line.
    // endIndex: the end of our search for a symbol.
    let index = startIndex + 1;
    let endIndex = index + number.length;
    if (endIndex < line.length) {
      endIndex++;
    }

    // First check for a symbol left & right
    if (isSymbol(line.substring(startIndex, endIndex))) {
      valid = true;
    }
    // Check for any symbols in the line prior, if one exists
    if (prevLine && isSymbol(prevLine.substring(startIndex, endIndex))) {
      valid = true;
    }
    // Check for any symbols in the line following, if one exists
    if (nextLine && isSymbol(nextLine.substring(startIndex, endIndex))) {
      valid = true;
    }

    if (valid) {
      // If we found an adjacent symbol, it's a part number.
      result.push(parseInt(number, 10));
    }
  });

  return result;
}

// Check if the passed character is a symbol.
// For the purposes ofr tthis exercise, we're assuming
// `str` is length 1, and is a symbol if it isn't a number or a period.
function isSymbol(str) {
  return /[^0-9\.]/.test(str);
}

if (require.main === module) {
  main();
}