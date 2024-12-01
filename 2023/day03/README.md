# Advent of Code 2023
## Day 3: *Gear Ratios*

### Part 1

You are given a text input (called a "schematic") consisting of numbers and symbols. Your job is to find every case where a number is adjacent to symbol horizontally, vertically or diagonally. Dots (.) are not symbols and are only used as neutral seperators.

Here is an example input:

```
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
```
For this example, every number is adjacent to a symbol EXCEPT 114 and 58.

Your program should return the sum of all numbers that are adjacent to a symbol.

### Part 2

Now we must consider the asterisk (*) character as a special symbol. We need to find all the cases where an asterisk is adjacent to two (and exactly two) numbers.

Given the eearlier sample input again:

```
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
```
There are two asterisks meeting tthis requirement: the top left (with numbers 467 & 35 adjacent), and the lower right (with 755 & 598 adjaceent).

Write a program that:
1. Finds all asterisks with two adjacent numbers.
2. For each asterisk, multiply their numbers together. e.g. for the first example above, 467 & 35 would generate 16345.
3. Finally, sum all the multiplied asterisk values together.

The final program output should be the result of step 3.