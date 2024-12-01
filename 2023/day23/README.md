# Advent of Code 2023
## Day 23: *A Long Walk*

### Part 1

Given a map, a starting point, and an ending point, find the longest possible path from the start to the finish without visiting a space more than once.

For example:
```
#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
```

The starting point is the space marked by a `.` on the first line. Similarly, the ending point is the space marked by a `.` on the last line. Spaces marked with `#` are blocked and can't be used. Spaces marked with `>` are one-way to the right, e.g. you can only move from left to right over the space, not right to left. Similarly, spaces marked with `v` are one-way down -- you can only move from top to bottom over the space, not bottom to top. Spaces marked with `.` have no restrictions and can be entered and exited from any direction (but only once, as described above).

Given this, the longest path for the example above would look like this, where `O` spaces mark the path.
```
#S#####################
#OOOOOOO#########...###
#######O#########.#.###
###OOOOO#OOO>.###.#.###
###O#####O#O#.###.#.###
###OOOOO#O#O#.....#...#
###v###O#O#O#########.#
###...#O#O#OOOOOOO#...#
#####.#O#O#######O#.###
#.....#O#O#OOOOOOO#...#
#.#####O#O#O#########v#
#.#...#OOO#OOO###OOOOO#
#.#.#v#######O###O###O#
#...#.>.#...>OOO#O###O#
#####v#.#.###v#O#O###O#
#.....#...#...#O#O#OOO#
#.#########.###O#O#O###
#...###...#...#OOO#O###
###.###.#.###v#####O###
#...#...#.#.>.>.#.>O###
#.###.###.#.###.#.#O###
#.....###...###...#OOO#
#####################O#
```

This path's length is `94`.

For the given input, what is the longest possible path from the start to the finish? Remember not to revisit spaces already visited.

### Part 2

Now ignore the rules for `>` and `v` spaces -- they behave like a normal `.` space. For the example above, the longest path now increases to a length of `154` spaces.

For the same input, what is the longest possible path from the start to the finish after this rule change? Remember not to revisit spaces already visited.