/*
ADVENT OF CODE: Day 4, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let scratchcards = [];

  try {
    // Read in the schematic, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('scratchcards.txt'), 'utf8');
    scratchcards = data.split(EOL).reduce((prev, current) => {
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

  // Iterate over the scratchcards.
  // Total the points together.
  let points = scratchcards.map((scratchcard) => {
    console.log(`Checking ${scratchcard}`);

    const score = getPoints(scratchcard);
    console.log(`Awarded ${score} point(s).`);
    return score;
  });

  total = points.reduce((prev, current) => prev + current, 0);
  console.log(`TOTAL: ${total}`);
}

function getPoints(scratchcard) {
  // Parse the scorecard string into actual winning & candidate numbers.
  let contents = parseCard(scratchcard);

  // Iterate over the candidate numbers, and see which appear in the winning list.
  // Double our points tally for each winning number.
  // Return the final tally.
  return contents.candidate.reduce((prev, current) => {
    if (!isNaN(current) && contents.winning.includes(current)) {
      prev = prev ? prev * 2 : 1;
    }

    return prev;
  }, 0);
}

// Parse a scorecard string, returning an object with the card label
// and arrays of winning & candidate numbers.
function parseCard(scratchcard) {
  let [cardInfo, cardNumbers] = scratchcard.split(':');
  let [winningNumString, candidateNumString] = cardNumbers.split('|');

  // Some numbers in the string have multiple spaces between them so that
  // they line up nicely when viewed with a monospace font.
  // Using a regex here allows us to split the numbers cleanly.
  let winningNumbers = winningNumString.trim().split(/\s+/);
  let candidateNumbers = candidateNumString.trim().split(/\s+/);

  return {
    card: cardInfo,
    winning: winningNumbers.map((num) => parseInt(num.trim(), 10)),
    candidate: candidateNumbers.map((num) => parseInt(num.trim(), 10)),
  };
}

if (require.main === module) {
  main();
}