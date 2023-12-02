/*
ADVENT OF CODE: Day 2, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

// We need to find which game outcomes could have come from
// this initial state of cubes. Factoring this out into a 
// constant makes the code more generic, allowing us to
// easily change the initial state or provide a mechanism to
// dynamically pass in an initial state, if desired.
const INITIAL_STATE = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  let gameResults = [];

  try {
    // Read in the list of game results from an external
    // file, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('games.txt'), 'utf8');
    gameResults = data.split(EOL).reduce((prev, current) => {
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
  // For each game result, determine whether it would
  // have been possible for a given initial state.
  // Total the game IDs together.
  gameResults.forEach((result) => {
    const validId = checkGame(result, INITIAL_STATE);

    if (validId) {
      console.log(`Game is possible.`);
      total += validId;
    }
    else {
      console.log(`Game is impossible.`);
    }
  });

  console.log(`TOTAL: ${total}`);
}

function checkGame(game, initialState) {
  let gameData = parseGame(game);

  console.log(`Game ${gameData.id}: ${JSON.stringify(gameData.groups)}`);

  // For each group of cubes in a game, see if any value exceeds
  // what we have in initialState.
  return gameData.groups.reduce((prev, current) => {
    let result = prev;

    // If result is 0, we've already determined the game state is impossible,
    // so we can skip running this analysis.
    if (result > 0) {
      Object.keys(initialState).forEach((color) => {
        // If the game state has more cubes of a certain color than are
        // available in the initial state, this is an impossible game state.
        // Set the result to 0 so that it doesn't get tallied.
        if (current[color] && current[color] > initialState[color]) {
          result = 0;
        }
      });
    }

    return result;
  }, gameData.id);
}

function parseGame(game) {
  // Parsing a game state string could be done with a regular expression,
  // but that seems overkill for the input in this game, which is consistent
  // and well defined.

  // First, break out the game number & game state info.
  const [gameInfo, groupInfo] = game.split(':');

  // Grab the game number.
  const [gameTxt, gameId] = gameInfo.split(' ');
  // Break out each "hand" in the game state into their own array bucket.
  const groups = groupInfo.split(';');

  // For each "hand", figure out how many cubes of each color there are.
  const gameGroups = groups.map((group) => {
    const result = {};
    // Colors are separated by commas; split them out, then iterate over them.
    group.split(',').forEach((colorCount) => {
      const [count, color] = colorCount.trim().split(' ');
      result[color] = parseInt(count, 10);
    });
    return result;
  });

  return {
    id: parseInt(gameId, 10),
    groups: gameGroups,
  };
}

if (require.main === module) {
  main();
}