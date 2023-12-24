# Advent of Code 2023
## Day 13: *Point of Incidence*

### Part 1

Given a grid, detect the row or column that has a reflection -- as in, each row or column is a mirror copy.

For example:
```
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.
```

On this grid, the reflection line is between columns 5 & 6. Not only are those columns a reeflection of each other, but every pair of columns after that -- columns 4 & 7, columns 3 & 8, etc until there are no more columns. Note there may be some "leftover" columns that don't have a reflection.

Write a program that finds the column or row that starts a reflection on a grid.