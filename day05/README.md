# Advent of Code 2023
## Day 5: *If You Give A Seed A Fertilizer*

### Part 1

You are provided a set of mapping tables, where each table takes a numerical input and returns a numerical output. Each output feeds into the next table, until you end up with a final result.

The input is presented with a set of inputs labeled as "seeds". After that, each mapping group has a destination start, source start and a range for both.

Example input:
```
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
```
(These headings are specific to the original challenge text, and are preserved here since they're referenced in the solution code.)
Here, the inputs include the numbers 79 14 55 13.
The first mapping group is labeled "seed-to-soil map" and includes two mappings:
50 98 2
52 50 48

The first row shows that the destination values start at 50. The source values start at 98. And both have a range of 2.
This means that:
* Source/input values are 98, 99.
* Destination/output values are 50, 51.
* There are only two numbers for both because the range value is 2.

Written another way, the mappings for the first row look like this:
98->50
99->51

Any numbers not covered by the mappings should pass through unchanged. For example, a source value of 10 has no mapping in the first group, so the destination value would be 10 as well.

Given this, run the input (seed) values through each mapping group to get final destination value. Which of the final destination values is the lowest?

### Part 2

In part one, each input "seed" value was a standalone value. Now consider them in pairs, where the first value is a start value, and the second value is a range.

Looking at the example above:
`seeds: 79 14 55 13`
There are two pairs of values, each representing a range of seed values.

One range starts at 79 and covers 14 values (79-92). The second range starts at 55 and covers 13 values (55-67). Each value in these ranges is a disttinct seed, which means there are now 27 seed values to check.

Using these new start values, determine which of the final destination values is the lowest.