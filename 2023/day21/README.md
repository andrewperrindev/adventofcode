# Advent of Code 2023
## Day 21: *Step Counter*

### Part 1

Given a map and a starting position, calculate how many spaces someone could reach in 64 steps.

For example:
```
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
```

The starting place on this map is denoted by the `S`. The spaces marked with `#` contain large rocks and cannot be occupied. The `.` spaces are open. For each step, you can move to any adjacent `.` or `S` space by moving up, down, left or right.

In this example, after one step, you could move to any of the spaces marked with an `O`:
```
...........
.....###.#.
.###.##..#.
..#.#...#..
....#O#....
.##.OS####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
```

The second steps would start from the `O` spaces, so after a second step, you could be at any of these spaces:
```
...........
.....###.#.
.###.##..#.
..#.#O..#..
....#.#....
.##O.O####.
.##.O#...#.
.......##..
.##.#.####.
.##..##.##.
...........
```

Note that one of the occupied spaces is the start space.

After 64 steps, how many possible spaces could someone reach?