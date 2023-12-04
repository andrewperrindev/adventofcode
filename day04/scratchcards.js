/*
ADVENT OF CODE: Day 4, Part 2
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

  // Iterate over the scratchcards, parsing their data before
  // adding them to a lookup map for easy access later.
  const cardSet = scratchcards.reduce((prev, current) => {
    const card = parseCard(current);
    prev[card.card] = card;
    return prev;
  }, {});

  // Proceess the cards to figure out the final total.
  total = processCards(cardSet);
  console.log(`TOTAL: ${total}`);
}

// Parse a scorecard string, returning an object with the card label,
// arrays of winning & candidate numbers, and how many candidate numbers
// match the winning numbers. Doing this work upfront allows us to quickly
// process the cards later.
function parseCard(scratchcard) {
  let [cardInfo, cardNumbers] = scratchcard.split(':');
  let [winningNumString, candidateNumString] = cardNumbers.split('|');

  // Some numbers in the string have multiple spaces between them so that
  // they line up nicely when viewed with a monospace font.
  // Using a regex here allows us to split the numbers cleanly.
  let winningNumbers = winningNumString.trim().split(/\s+/);
  let candidateNumbers = candidateNumString.trim().split(/\s+/);

  let cardNum = parseInt(cardInfo.substring(4), 10);

  let card = {
    card: cardNum,
    winning: winningNumbers.map((num) => parseInt(num.trim(), 10)),
    candidate: candidateNumbers.map((num) => parseInt(num.trim(), 10)),
  };
  card.matchCount = getMatchCount(card);
  return card;
}

function getMatchCount(parsedScratchcard) {
  // Iterate over the candidate numbers, and see which appear in the winning list.
  // This time, we're just counting matches.
  return parsedScratchcard.candidate.reduce((prev, current) => {
    if (!isNaN(current) && parsedScratchcard.winning.includes(current)) {
      prev += 1;
    }

    return prev;
  }, 0);
}

function processCards(cardSet) {
  // This is the meat of the work.
  // Iterate over our list of cards, and create duplicates as described
  // in the challenge description.
  let cardList = Object.values(cardSet);
  for(let index = 0; index < cardList.length; index++) {
    let card = cardList[index];
    if (card.matchCount) {
      // Duplicate the next N cards, where N is the number of winning matches.
      for (let copies = 1; copies <= card.matchCount; copies++) {
        // Grab the desired card number from our map.
        let dupCard = cardSet[card.card + copies];

        // This is just pushing a reference to the exact same card into the array.
        // If we were modifying data, we'd want to make a copy first.
        // But we're not, so we don't.
        cardList.push(dupCard);
      }
    }
  }

  // Our result is the final tally of cards.
  return cardList.length;
}

if (require.main === module) {
  main();
}