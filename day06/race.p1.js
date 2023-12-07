/*
ADVENT OF CODE: Day 6, Part 1
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let races = [];

  try {
    // Read in the race info, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('race.input.txt'), 'utf8');
    races = data.split(EOL).reduce((prev, current) => {
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

  // Parse out the time & record distances for each race.
  const raceInfo = parseRaces(races);

  console.log(`Race details: ${JSON.stringify(raceInfo)}`);

  // Calculate which speeds beat the current distance record.
  // Return the number of "winning" speeds.
  let winningSpeedCounts = raceInfo.map((race) => {
    let winningSpeeds = getWinningChargeTimes(race.time, race.distance);
    return winningSpeeds.length;
  });

  // Multiply tthe number of "winning" speeds for each race to get the final total.
  console.log(`TOTAL: ${winningSpeedCounts.reduce((prev, current) => prev * current, 1)}`);
}

// Read in each line, breaking them up into individual numbers.
// First line: max race time
// Second line: record distance recorded for the race
function parseRaces(races) {
  const raceList = [];
  const times = races[0].substring(6).trim().split(/\s+/).map((time) => parseInt(time, 10));
  const distances = races[1].substring(10).trim().split(/\s+/).map((distance) => parseInt(distance, 10));
  
  for (let count = 0; count < times.length; count++) {
    raceList.push({
      time: times[count],
      distance: distances[count],
    });
  }
  
  return raceList;
}

function getWinningChargeTimes(time, distance) {
  const winningSpeeds = [];

  // Given the full allotted time, this is the mm/ms required to get close to the winning distance.
  // This skips over some obvious low speeds that won't beat the record distance.
  // This is a minor optimization, but there is likely an equation that models this behavior that
  // would be more efficient & accurate.
  let speed = parseInt(distance/(time - 1), 10);

  // Find & save the speeds that surpass the winning distances.
  while (speed < time - 1) {
    console.log(`Speed: ${speed}, Time left: ${time - speed}, Distance: ${speed * (time-speed)}`);
    if (speed * (time - speed) > distance) {
      winningSpeeds.push(speed);
    }
    speed++;
  }

  return winningSpeeds;
}

if (require.main === module) {
  main();
}