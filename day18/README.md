# Advent of Code 2023
## Day 18: *Lavaduct Lagoon*

### Part 1

Given a list of plans for the border of a trench, calculate the total area of the holding trench.

For example:
```
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
```

The first instruction describes the direction of movement. The second instruction is the length. The third instruction can be ignored. Given these instructions, the following border would be created:
```
#######
#.....#
###...#
..#...#
..#...#
###.###
#...#..
##..###
.#....#
.######
```

After filling in the spaces between the border, the final trench & its area can be visualized:
```
#######
#######
#######
..#####
..#####
#######
#####..
#######
.######
.######
```

Given a list of instructions, write a program to calculate the total area.

### Part 2

Turns out the third parameter is the actual length & direction. The first five characters represent the length in hex. The sixth character represents the direction: 0 = R, 1 = D, 2 = L, and 3 = U. For example, given the example in part 1:
```
#70c710 = R 461937
#0dc571 = D 56407
#5713f0 = R 356671
#d2c081 = D 863240
#59c680 = R 367720
#411b91 = D 266681
#8ceee2 = L 577262
#caa173 = U 829975
#1b58a2 = L 112010
#caa171 = D 829975
#7807d2 = L 491645
#a77fa3 = U 686074
#015232 = L 5411
#7a21e3 = U 500254
```

Calculate the area of the trench given these new instructions.