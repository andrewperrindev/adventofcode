# Advent of Code 2025

Each folder is a separate coding challenge that was part of the [Advent of Code 2025](https://adventofcode.com/2025) event. Like a traditional advent calendar, each day until December 12th was a new coding challenge. In addition, each coding challenge had two parts.

Below is a summary of each day's challenges. Some days I didn't have time to complete the second part, or didn't have time to complete the day at all, so they are omitted.

## Introduction

Each day in the Advent of Code provided a new backstory to that day's coding challenge. For copyright reasons, I'm not including the backstory for each day, but instead a summary of what the resulting code should do. Please visit [Advent of Code 2025](https://adventofcode.com/2025) for the flavor text & why each day has the name it does.

## Summary

- Day 1 (_Secret Entrance_): Given a list of instructions for turning a dial on a rotary lock, find how many times the lock stops at position 0. Part 2 counts how many times the lock stops or passes position 0 while executing the instructions.
- Day 2 (_Gift Shop_): Find product IDs in a range of IDs that are invalid. An ID is invalid if the numbers repeat halfway through (e.g. 123123). Part 2 makes an ID invalid if there are repeating numbers of any size group (e.g. 121212).
- Day 3 (_Lobby_): Find two consective batteries in a bank of batteries that yield the most power. Part 2 expands the number of batteries from two to twelve.
- Day 4 (_Printing Department_): Given a grid of `.` and `@`, find the number of `@` spaces that have no more than 3 `@` in the eight spaces surrounding it. Part 2 repeats this process, replacing `@` spaces that match the criteria above with `.` until no more can be replaced.
- Day 5 (_Cafeteria_): Provided a list of numerical ranges, and a list of individual numbers, count how many of the numbers fall within the given ranges. Part 2 must instead count the total numbers covered by the ranges, keeping in mind that the ranges overlap.
- Day 6 (_Trash Compactor_): Calculate each column of numbers in the input using the operator on the last line of the column, then sum the results. Part 2 requires the numbers to be read vertically instead of horizontally -- e.g. The first column of numbers is the first operand, the second column of numbers is the second operand, etc until an empty column is encountered.
- Day 7 (_Laboratories_): Find how many times a path is split on a grid. Part 2 counts how many distinct paths can be taken to the end.
