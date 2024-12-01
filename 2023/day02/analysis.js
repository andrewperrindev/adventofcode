/*
ADVENT OF CODE: Day 2, Part 2
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

// Master list of cube colors possible in the game.
const COLORS = [
  'red',
  'green',
  'blue',
];

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

  gameResults.forEach((result) => {
    // For each game result, determine the minimum state
    // needed for that game to happen.
    const initialState = getRequiredState(result);

    if (initialState) {
      console.log(`Minimum initial state: ${JSON.stringify(initialState)}`);

      // Total the power of the initial color counts together.
      total += Object.values(initialState).reduce((prev, current) => prev * current, 1);
    }
  });

  console.log(`TOTAL: ${total}`);
}

function getRequiredState(game) {
  let gameData = parseGame(game);

  console.log(`Game ${gameData.id}: ${JSON.stringify(gameData.groups)}`);

  // For each group, iterate over the number of cubes for each color,
  // and if it's greater than our current "initial state" number, then
  // update the initial state with the larger value.
  return gameData.groups.reduce((prev, current) => {
    Object.keys(current).forEach((color) => {
      if (!prev[color] || current[color] > prev[color]) {
        prev[color] = current[color];
      }
    });

    return prev;
  }, {});
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