# Advent of Code 2024

Each folder is a separate coding challenge that was part of the [Advent of Code 2024](https://adventofcode.com/2024) event. Like a traditional advent calendar, each day in December was a new coding challenge. In addition, each coding challenge had two parts.

Below is a summary of each day's challenges. Some days I didn't have time to complete the second part, or didn't have time to complete the day at all, so they are omitted.

## Introduction

Each day in the Advent of Code provided a new backstory to that day's coding challenge. For copyright reasons, I'm not including the backstory for each day, but instead a summary of what the resulting code should do. Please visit [Advent of Code 2024](https://adventofcode.com/2024) for the flavor text & why each day has the name it does.

## Summary

- Day 1 (_Historian Hysteria_): First part sorts two columns of numbers, then sums the differences between the values in each column. Second part instead finds the number of times each number in the first column occurs in the second column, then multiplies the first column number by the number of occurrences; the sum of these values is the result.
- Day 2 (_Red-Nosed Reports_): First part checks a list of numbers to see if they pass a certain list of requirements. Second part does the same, except it tries to discard one of the erroenous numbers in the list to see if the remaining numbers pass the requirements.
- Day 3 (_Mull It Over_): First part parses out "multiply" commands from a text string and returns the sum of the multiplied numbers. Second part adds two additional commands that determine whether the "multiply" commands should be part of the sum or not.
- Day 4 (_Ceres Search_): First part searches for the word `XMAS` in a grid of letters in any direction. Second part searches for two instances of the word `MAS` (forward or reverse) such that they form an `X` shape in a grid of letters, e.g. `MAS` and `SAM` intersecting at the letter `A` on diagonals.
- Day 5 (_Print Queue_): Given page order requirements, determine if a list of "page updates" are in the correct order or not. In the second part, fix the order for any "page updates" that are invalid.
- Day 6 (_Guard Gallivant_): First part calculates the path a guard will take, given a map (grid) with the guard's initial location & obstacles in her way. Second part adds additional obstacles along the guard's path to see how many ways the guard can get stuck in a loop. <sup>NB</sup>
- Day 7 (_Bridge Repair_): First part tries every permutation of `+` and `*` operators in a list of numbers to see if it's possible to calculate the specified result. Part two is the same, but adds a `||` operator that concatenates two numbers.
- Day 8 (_Resonant Collinearity_): First part calculates the location of **two** "antinodes" for all antenna pairs on a grid. Second part calculates the location of **all** "antinodes" that fit within the grid bounds (for all antenna pairs on the grid).
- Day 9 (_Disk Fragmenter_): First part moves parts of files from the end of a "disk" to free space near the start of the disk. Second part only moves full files if there is enough contiguous free space available closer to the start of the disk. <sup>NB</sup>
- Day 10 (_Hoof It_): First part finds how many distinct end points a trailhead can reach. The second part finds how many trails exist for a trailhead, even if they end up at the same end point.
