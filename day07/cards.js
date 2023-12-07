/*
ADVENT OF CODE: Day 7, Part 2
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

// Reference map of card label to card rank for tie break purposes.
// Rank 1 is strongest, rank 13 is weakest.
// `J` is now a joker, and has the weakest rank.
const CARD_VALUES = {
  A: 1,
  K: 2,
  Q: 3,
  T: 4,
  9: 5,
  8: 6,
  7: 7,
  6: 8,
  5: 9,
  4: 10,
  3: 11,
  2: 12,
  J: 13,
};

async function main() {
  let cards = [];

  try {
    // Read in the card hand info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('cards.input.txt'), 'utf8');
    cards = data.split(EOL).reduce((prev, current) => {
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

  // Parse out the card hands & bids.
  const hands = parseCardHands(cards);

  // Calculate the ranking from weakest hand to strongest hand
  let rankedHands = hands.sort(handCompare);

  // Final total is calculated by first multiplying a hand's bid by its ranking.
  // Then, all the adjusted bid values are summed together.
  console.log(`TOTAL: ${rankedHands.reduce((prev, current, index) => prev + (current.winnings * (index + 1)), 0)}`);
}

// Compare function for javascript array sort function.
// Takes in two hands, returning a value that represents which is stronger.
function handCompare(handInfo1, handInfo2) {
  // Rank each hand based on its type
  const rank1 = rankHand(parseHand(handInfo1.hand));
  const rank2 = rankHand(parseHand(handInfo2.hand));

  // Lower rank is better.
  // hand1 is stronger than hand2
  if (rank1 < rank2) {
    return 1;
  }
  // hand2 is stronger than hand1
  else if (rank1 > rank2) {
    return -1;
  }
  // same rank based on type.
  else {
    // Compare the individual cards from each hand from left to right
    let hand1 = handInfo1.hand;
    let hand2 = handInfo2.hand;
    let rank = 0;
    // As soon as we have a tie-breaking rank (non-zero), break the loop
    for (let cardNum = 0; cardNum < hand1.length && !rank; cardNum++) {
      rank = rankCards(hand1[cardNum], hand2[cardNum]);
    }
    return rank;
  }
}

// Parses a hand string into a map where the keys are a
// card label, and the values are how many of that card exist
// in the hand
function parseHand(hand) {
  return hand.split('').reduce((prev, current) => {
    let tally = prev[current] ?? 0;
    prev[current] = tally + 1;
    return prev;
  }, {});
}

// Rank two individual cards. Used to break a tie.
function rankCards(card1, card2) {
  if (CARD_VALUES[card1] < CARD_VALUES[card2]) {
    return 1;
  }
  else if (CARD_VALUES[card1] > CARD_VALUES[card2]) {
    return -1;
  }
  else {
    return 0;
  }
}

function rankHand(handInfo) {
  // We can determine the type of hand by looking at how many
  // distinct card labels there are in our hand and (in some cases)
  // how many of each card label exists in our hand.
  const distinctCards = Object.keys(handInfo);
  const cardCounts = Object.values(handInfo);

  // For the joker rules, we need to modify the arrays
  // before analyzing the hand.
  applyJokers(distinctCards, cardCounts);

  switch(distinctCards.length) {
    case 1:
      // Five of a kind
      return 1;
    case 2:
      // Hand has a 4/1 split (Four of a kind)
      if (Math.max(...cardCounts) === 4) {
        return 2;
      }
      // Hand has a 3/2 split (Full house)
      else {
        return 3;
      }
    case 3:
      // Hand has a 3/1/1 split (Three of a kind)
      if (Math.max(...cardCounts) === 3) {
        return 4;
      }
      // Hand has a 2/2/1 split (Two pair)
      else {
        return 5;
      }
    case 4:
      // One pair
      return 6;
    default:
      // High card
      return 7;
  }
}

function applyJokers(cardList, countList) {
  let jokerIndex = cardList.indexOf('J');

  // If a joker exists in this hand, and the hand isn't all jokers
  if (jokerIndex >= 0 && countList[jokerIndex] < 5) {
    // Grab the number of jokers, then remove the joker card & count
    let jokerCount = countList[jokerIndex];
    cardList.splice(jokerIndex, 1);
    countList.splice(jokerIndex, 1);

    // Jokers make the current hand better. The most efficient
    // way of doing this is by adding the joker count to whichever
    // card type we already have the most of.
    let maxCount = Math.max(...countList);
    let maxIndex = countList.indexOf(maxCount);
    countList[maxIndex] += jokerCount;
  }
}

// Read in each line, 
function parseCardHands(cards) {
  return cards.map((card) => {
    const [hand, winnings] = card.split(' ');
    return {
      hand,
      winnings
    };
  });
}

if (require.main === module) {
  main();
}