/*
ADVENT OF CODE: Day 10, Part 2
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

async function main() {
  let maze = [];

  try {
    // Read in the map info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('maze.example.txt'), 'utf8');
    maze = data.split(EOL).reduce((prev, current) => {
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

  maze = maze.map((row) => row.split(''));
  // Create a clean copy of the map. This will allow us to mark just the path
  // and calculate the interior later.
  mazeWithPath = maze.map((row) => row.map(() => '.'));

  // Maze starts at the point marked with 'S'
  let [startX, startY] = findStart(maze);
  // Start traversing the map in every direction to find a path.
  let promises = Object.keys(DIRECTIONS).map((direction) => {
    return new Promise((resolve) => {
      resolve(findPath(maze, startX, startY, direction, mazeWithPath));
    });
  });
  // When all traversals are done, find the largest number (which should
  // be the full path), and divide in 2 to find the halfway spot.
  Promise.all(promises).then((values) => {
    // Figure out what the 'S' space type is so we can complete the loop path.
    let startSpace = getStartSpaceType(values);
    setSpace(mazeWithPath, startX, startY, startSpace);
    // Use our "clean" map to calculate how many spaces are on the
    // interior of our loop path.
    let enclosedCount = findEnclosedTiles(mazeWithPath);
    mazeWithPath.map((row) => console.log(row.join('')));
    console.log(`MIDWAY: ${Math.max(...values) / 2}`);
    console.log(`ENCLOSED: ${enclosedCount}`);
  });
}

// Return the coordinates of the space marked 'S'
function findStart(maze) {
  return maze.reduce((prev, current, index) => {
    if (prev[0] < 0) {
      let x = current.reduce((prev, current, index) => current === 'S' ? index : prev, -1);
      if (x >= 0) {
        return [x, index];
      }
    }
    return prev;
  }, [-1, -1])
}

// Analyze which direction we entered and left the start space
// in our loop, and replace the 'S' with the appropriate type.
function getStartSpaceType(results) {
  if (results[0] > -1) {
    if (results[1] > -1) {
      return '|';
    }
    else if (results[2] > -1) {
      return 'J';
    }
    else if (results[3] > -1) {
      return 'L';
    }
  }
  else if (results[1] > -1) {
    if (results[2] > -1) {
      return '7';
    }
    else if (results[3] > -1) {
      return 'F';
    }
  }
  else if (results[2] > -1) {
    return '-';
  }
  else {
    return 'S';
  }
}

function findPath(maze, startX, startY, direction, mazeWithPath) {
  // Keep track of how many steps it takes to traverse the path.
  // This is our return value.
  let count = 0;
  // Grab the current space value.
  let space = getSpace(maze, startX, startY);

  // Traverse the path until we get back to the start.
  while (count === 0 || space !== 'S') {
    // Locate the space we need to move to next.
    let [nextX, nextY] = getNextCoords(direction, startX, startY);
    // Grab its value.
    let nextSpace = getSpace(maze, nextX, nextY);

    // If this is a valid space we can move to...
    if (isValidEntry(direction, nextSpace)) {
      // ... increasee our step count and set all our current
      // variables to the new space. Calculate the direction
      // we'll need to go to next given this space's value.
      count++;
      [startX, startY] = [nextX, nextY];
      space = nextSpace;
      direction = getNextDirection(nextSpace, direction);

      // Mark this space on our "clean" map for later.
      if (mazeWithPath) {
        setSpace(mazeWithPath, startX, startY, space);
      }
    }
    else if (nextSpace === 'S') {
      // If we find ourselves at the start, return the count.
      // We add one to account for the fact that we haven't
      // "moved" to the start yet.
      return count + 1;
    }
    else {
      // Any other case means this isn't a valid path.
      return -1;
    }
  }

  return count;
}

function findEnclosedTiles(mazeWithPath) {
  // Return value. The number of tiles inside the loop path.
  let count = 0;
  let insideLoop = false;
  let lastBend = null;

  // Iterate over the final map & path, left-to-right, top-to-bottom
  for (let rowIndex = 0; rowIndex < mazeWithPath.length; rowIndex++) {
    let row = mazeWithPath[rowIndex];
    for (let spaceIndex = 0; spaceIndex < row.length; spaceIndex++) {
      // Look at each space and figure out if we're moving inside the loop
      // or outside the loop.
      let space = row[spaceIndex];
      if (space === '|') {
        insideLoop = !insideLoop;
      }
      else if (space === 'F' && !lastBend) {
        lastBend = 'F';
      }
      else if (space === 'J') {
        // A bend like this is similar to `|` but offset to the
        // right. Treat it the same as `|` as we move past it.
        if (lastBend === 'F') {
          insideLoop = !insideLoop;
        }
        lastBend = null;
      }
      else if (space === 'L' && !lastBend) {
        lastBend = 'L';
      }
      else if (space === '7') {
        // A bend like this is similar to `|` but offset to the
        // left. Treat it the same as `|` as we move past it.
        if (lastBend === 'L') {
          insideLoop = !insideLoop;
        }
        lastBend = null;
      }
      // Mark any non-path spacees inside the loop with a
      // special `O` character.
      else if (space === '.' && insideLoop) {
        setSpace(mazeWithPath, spaceIndex, rowIndex, 'O');
        count++;
      }
    }
  }

  return count;
}

function getSpace(maze, x, y) {
  if (x < 0 || y < 0 || y >= maze.length || x >= maze[0].length) {
    return '?';
  }
  return maze[y][x];
}

function setSpace(maze, x, y, space) {
  if (x < 0 || y < 0 || y >= maze.length || x >= maze[0].length) {
    return;
  }
  maze[y][x] = space;
}

// Given a direction and coordinates, figure out what the new
// coordinates should be.
function getNextCoords(direction, x, y) {
  switch(direction) {
    case DIRECTIONS.UP: return [x, y - 1];
    case DIRECTIONS.DOWN: return [x, y + 1];
    case DIRECTIONS.LEFT: return [x - 1, y];
    case DIRECTIONS.RIGHT: return [x + 1, y];
  }
}

// Given a space and the direction we entered, return where we need to move
// to leave the space.
function getNextDirection(space, entryDirection) {
  switch(space) {
    case '|':
      return (entryDirection === DIRECTIONS.UP) ? DIRECTIONS.UP : DIRECTIONS.DOWN;
    case '-':
      return (entryDirection === DIRECTIONS.LEFT) ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT;
    case '7':
      return (entryDirection === DIRECTIONS.RIGHT) ? DIRECTIONS.DOWN : DIRECTIONS.LEFT;
    case 'F':
      return (entryDirection === DIRECTIONS.LEFT) ? DIRECTIONS.DOWN : DIRECTIONS.RIGHT;
    case 'L':
      return (entryDirection === DIRECTIONS.DOWN) ? DIRECTIONS.RIGHT: DIRECTIONS.UP;
    case 'J':
      return (entryDirection === DIRECTIONS.DOWN) ? DIRECTIONS.LEFT : DIRECTIONS.UP;
  }

  return null;
}

function isValidEntry(direction, space) {
  switch(direction) {
    case DIRECTIONS.UP: return (space === '|' || space === '7' || space === 'F');
    case DIRECTIONS.DOWN: return (space === '|' || space === 'L' || space === 'J');
    case DIRECTIONS.LEFT: return (space === '-' || space === 'F' || space === 'L');
    case DIRECTIONS.RIGHT: return (space === '-' || space === '7' || space === 'J');
    default: false;
  }
}

if (require.main === module) {
  main();
}