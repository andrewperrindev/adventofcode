/*
ADVENT OF CODE: Day 12, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let springs = [];

  try {
    // Read in the spring info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('springs.input.txt'), 'utf8');
    springs = data.split(EOL).reduce((prev, current) => {
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

  const springInfo = parseSpringData(springs);
  console.log(springInfo);
  const options = springInfo.map((spring) => findPattern(spring.info, spring.pattern));
  console.log(options);
  console.log(`TOTAL: ${options.reduce((prev, current) => prev + current, 0)}`);
}

// I had limited time today to code a solution, so I wrote up the first thing that came to mind.
// It's small & succinct, but as a brute force method it is (predictably) very slow.
// Better option would be to use recursion to build the string out one character at a time while
// also having a cache mechanism to avoid repeating calculations.
function findPattern(candidate, pattern) {
  const index = candidate.indexOf('?');

  if (index >= 0) {
    return findPattern(candidate.substring(0, index) + '.' + candidate.substring(index + 1), pattern)
      + findPattern(candidate.substring(0, index) + '#' + candidate.substring(index + 1), pattern);
  }

  return pattern.test(candidate) ? 1 : 0;
}

function parseSpringData(springs) {
  return springs.map((spring) => {
    const [info, config] = spring.split(/\s+/);
    let pattern = config.split(',').reduce((prev, current) => {
      return prev + '#'.repeat(current) + '\\.+';
    }, '');
    // Create a regular expression that matches a valid pattern.
    pattern = '(^\\.*)' + pattern.substring(0, pattern.length - 3) + '(\\.*$)';
    return {
      info,
      pattern: new RegExp(pattern),
    };
  });
}

if (require.main === module) {
  main();
}