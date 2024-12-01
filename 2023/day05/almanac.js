/*
ADVENT OF CODE: Day 5, Part 2
See README for context.
*/
const fs = require('node:fs/promises');
const path = require('node:path');
const EOL = require('node:os').EOL;

async function main() {
  let almanac = [];

  try {
    // Read in the almanac, and separate each line into its own array bucket.
    const data = await fs.readFile(path.resolve('almanac.input.txt'), 'utf8');
    almanac = data.split(EOL).reduce((prev, current) => {
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

  // Iterate over the almanac mappings, parsing its data to make
  // the calculations easier later.
  const almanacInfo = parseAlmanac(almanac);
  // Find the lowest destination value for the given sources & mappings.
  const minLocation = getLowestSeedLocation(almanacInfo);

  console.log(`RESULT: ${minLocation}`);
}

function getLowestSeedLocation(almanac) {
  let lowestLocation = Infinity;

  // For each seed, run it through each mapping sequentially
  // until we get to the final "location" result.
  while (almanac.seeds.length > 0) {
    const startSeed = almanac.seeds.shift();
    const seedRange = almanac.seeds.shift();

    console.log(`Checking seeds ${startSeed}-${startSeed + seedRange}`);

    // We now havee a range of seeds to check. This is definitely the "brute force"
    // method of running the analysis. Given more time, a fun challenge would be to
    // find a more efficient way of locating the lowest location value. 
    for (let seed = startSeed; seed < (startSeed + seedRange); seed++) {
      let soil = findMappedValue(seed, almanac.seedToSoil);
      let fertilizer = findMappedValue(soil, almanac.soilToFertilizer);
      let water = findMappedValue(fertilizer, almanac.fertilizerToWater);
      let light = findMappedValue(water, almanac.waterToLight);
      let temperature = findMappedValue(light, almanac.lightToTemperature);
      let humidity = findMappedValue(temperature, almanac.temperatureToHumidity);
      let location = findMappedValue(humidity, almanac.humidityToLocation);

      if (location < lowestLocation) {
        lowestLocation = location;
        console.log(`New lowest location: ${lowestLocation}`);
      }
    }
  }

  return lowestLocation;
}

// For a given source value, find the value it maps to using the provided mapping.
// If the value doesn't match a specified mapping, return the value unmodified.
function findMappedValue(value, mapping) {
  let mappedValue = value;

  mapping.forEach((mappedValues) => {
    if (value >= mappedValues.sourceStart && value <= mappedValues.sourceEnd) {
      const diff = value - mappedValues.sourceStart;
      mappedValue = mappedValues.destStart + diff;
    }
  });

  return mappedValue;
}

function parseAlmanac(data) {
  let almanac = {}, currentTarget = null;

  data.forEach((line) => {
    // Use each heading in the input file to define the inputs & mapping sections.
    if (line.startsWith('seeds')) {
      const seeds = line.substring(6).trim();
      const seedList = seeds.split(' ').map((seed) => parseInt(seed, 10));
      almanac.seeds = seedList;
    }
    else if (line.startsWith('seed-to-soil')) {
      currentTarget = [];
      almanac.seedToSoil = currentTarget;
    }
    else if (line.startsWith('soil-to-fertilizer')) {
      currentTarget = [];
      almanac.soilToFertilizer = currentTarget;
    }
    else if (line.startsWith('fertilizer-to-water')) {
      currentTarget = [];
      almanac.fertilizerToWater = currentTarget;
    }
    else if (line.startsWith('water-to-light')) {
      currentTarget = [];
      almanac.waterToLight = currentTarget;
    }
    else if (line.startsWith('light-to-temperature')) {
      currentTarget = [];
      almanac.lightToTemperature = currentTarget;
    }
    else if (line.startsWith('temperature-to-humidity')) {
      currentTarget = [];
      almanac.temperatureToHumidity = currentTarget;
    }
    else if (line.startsWith('humidity-to-location')) {
      currentTarget = [];
      almanac.humidityToLocation = currentTarget;
    }
    else {
      if (line.trim() !== '') {
        const [destStart, sourceStart, rangeLength] = line.split(' ').map((num) => parseInt(num, 10));
        currentTarget.push({
          sourceStart,
          sourceEnd: sourceStart + rangeLength - 1,
          destStart,
          destEnd: destStart + rangeLength - 1,
          rangeLength
        });
      }
    }
  });

  return almanac;
}

if (require.main === module) {
  main();
}