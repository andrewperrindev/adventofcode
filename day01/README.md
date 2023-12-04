# Advent of Code 2023
## Day 1: *Trebuchet?!*

### Part 1

For a given list of input strings, parse out the first number and last number, then concatenate them together to form a two-digit number.

For example:
```
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
```

In this example, the four numbers parsed out would be `12, 38, 15, and 77`. 
Adding these together produces 142.

The provided code should return the sum of numbers for a given input.

### Part 2

In addition to numerical digits, you must now consider numbers spelled out in words.
Only the numbers one through nine will be provided in the input.
For example:
```
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
```
In this example, the numbers parsed out would be `29, 83, 13, 24, 42, 14, and 76`. 
Adding these together produces 281.

The provided code should return the sum of numbers for a given input.