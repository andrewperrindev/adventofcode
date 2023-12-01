/*
ADVENT OF CODE: Day 1, Part 2
(See calibration.p1.js for part 1 & additional context.)

Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: 
one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. 
For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen

In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. 
Adding these together produces 281.

What is the sum of all of the calibration values?
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

const WORD_TO_INT = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

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

    console.log(`For ${value}, result is ${combined}`);
    total += combined;
  });

  console.log(`TOTAL: ${total}`);
}

function resolveNumber(input) {
  let first = null, last = null, substring = '';

  input.split('').forEach((char) => {
    // First try to parse the character as if it were an integer.
    let value = parseInt(char, 10);
    // If that doesn't work, perhaps it is spelling out an integer.
    // Keep track of characters we've encountered so far, and see if it
    // spells a known integer.
    if (isNaN(value)) {
      substring += char;
      value = convertWordToInt(substring);
    }
    else {
      // If we encounter an actual number, reset our saved string.
      substring = '';
    }

    // If result is a number, we save it as the first
    // value if it's the first number we've seen. In every
    // case, we update the last value.
    if (!isNaN(value)) {
      if (first == null) {
        first = value;
      }
      last = value;
    }
  });

  console.log(`For ${input}, first is ${first}, last is ${last}`);

  if (first !== null && last !== null) {
    // If we successfully found a first & last value,
    // combine them into one number.
    return parseInt(`${first}${last}`, 10);
  }
  else {
    // Warn if we didn't get two numbers.
    console.warn(`Could not parse two numbers from: '${input}'`);
  }

  return null;
}

function convertWordToInt(input) {
  input = input.toLowerCase();

  // For each of our known integer words, see if it exists in
  // the given input string. We specifically look for the last
  // occurence in case a number is repeated twice. This allows
  // us to accurately determine the "last" number in the string.
  const result = Object.keys(WORD_TO_INT).reduce((prev, current) => {
    const matchIndex = input.lastIndexOf(current);

    if (matchIndex > prev.index) {
      return {
        index: matchIndex,
        value: WORD_TO_INT[current],
      };
    }

    return prev;
  }, {
    index: -1,
    value: NaN
  });

  return result.value;
}

if (require.main === module) {
  main();
}