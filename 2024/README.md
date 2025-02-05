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
- Day 6 (_Guard Gallivant_): First part calculates the path a guard will take, given a map (grid) with the guard's initial location & obstacles in her way. Second part adds additional obstacles along the guard's path to see how many ways the guard can get stuck in a loop. <sup>NB - performance</sup>
- Day 7 (_Bridge Repair_): First part tries every permutation of `+` and `*` operators in a list of numbers to see if it's possible to calculate the specified result. Part two is the same, but adds a `||` operator that concatenates two numbers.
- Day 8 (_Resonant Collinearity_): First part calculates the location of **two** "antinodes" for all antenna pairs on a grid. Second part calculates the location of **all** "antinodes" that fit within the grid bounds (for all antenna pairs on the grid).
- Day 9 (_Disk Fragmenter_): First part moves parts of files from the end of a "disk" to free space near the start of the disk. Second part only moves full files if there is enough contiguous free space available closer to the start of the disk. <sup>NB - extra test</sup>
- Day 10 (_Hoof It_): First part finds how many distinct end points a trailhead can reach. The second part finds how many trails exist for a trailhead, even if they end up at the same end point.
- Day 11 (_Plutonian Pebbles_): Every time you blink, a set of stones mutate and/or generate new stones. Part 1: how many total stones are there after 25 blinks? Part 2: how many total stones are there after 75 blinks?
- Day 12 (_Garden Groups_): First part calculates the cost of fence for regions on a grid by finding their area and perimeter. Second part does the same, but uses number of sides instead of perimeter.
- Day 13 (_Claw Contraption_): Calculate the minimum number of button presses needed to win a prize from a machine.
- Day 14 (_Restroom Redoubt_): Part 1 calculates the position of guard robots after 100 seconds. Part 2 looks for the number of seconds until the robots (curiously) form the shape of a Christmas tree.
- Day 15 (_Warehouse Woes_): Both parts predict where a robot will move boxes to on a grid. Second part complicates things by making the boxes double width. <sup>NB - cleanup</sup>
- Day 16 (_Reindeer Maze_): First part asks to find the shortest distance from the start of a maze to the end. Second part asks for the number of coordinates on the grid that are part of at least one of the possible best paths.
- Day 17 (_Chronospatial Computer_): Part 1 executes a set of program instructions and returns the output. Part 2 is the reverse: given an output, what input would yield that result. <sup>NB - needs part 2 solution</sup>
- Day 18 (_RAM Run_): First part finds the minimum number of steps needed to escape a grid after a certain number of obstacles appear. Second part figures out the first obstacle that makes escape impossible.
- Day 19 (_Linen Layout_): Part 1: find how many desired towel designs are possible given the available patterns. Part 2: calculate all the possible ways a design could be made with the available patterns.
- Day 20 (_Race Condition_): Both parts find ways to cheat in a race through a maze. Part 2 simply extends how far you can cheat.
- Day 21 (_Keypad Conundrum_): Both parts involve instructing robots to use a series of directional pads to type out a code. First part only has two robots using directional pads; second part has 25.
- Day 22 (_Monkey Market_): First part calculates the sum of secret numbers of buyers in a stock market like scenario. <sup>NB - needs part 2 solution</sup>
- Day 23 (_LAN Party_): First part looks for sets of three connected computers, where at least one computer in the set starts with 't'. Part 2 finds the longest set of connected computer names.
- Day 24 (_Crossed Wires_): First part reads a set of logic gate instructions to calculate an output. Second part finds which instructions are incorrect.
- Day 25 (_Code Chronicle_): Given a set of 'keys' and 'locks', find how many combinations are valid. <sup>NB - needs part 2 solution</sup>
