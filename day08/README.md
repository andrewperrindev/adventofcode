# Advent of Code 2023
## Day 8: *Haunted Wasteland*

### Part 1

You're lost and need directions to get back to safety. Luckily, you have a map and a set of directions. Now you just need to figure out the route.

The input you're given consists of a set of left (L) and right (R) directions, along with a map of locations. It looks like this:

```
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
```

The first line describes the directions: the left and right turns needed to get to the destination. The rest of the input is the map of locations. Each line is a different location, and describes where you end up if you go left (the left value) or right (the right value).

Your current location is `AAA` and you must navigate to location `ZZZ`.

In the example above:
1. You start at location `AAA`. The first direction is `R`. This means you move to `CCC`.
2. The next direction is `L`. At location `CCC`, this means you navigate to `ZZZ`.
3. `ZZZ` is your destination, so you're done.

Conveniently we get to the destination as soon as we run out of directions. But, if that isn't the case, you simply repeat directions. In the case of our example, you would just repeat the `RL` directions, e.g. `RLRLRLRL...` until reaching location `ZZZ`.

In this example, it took `2 steps` to get to the destination (step 1: move to `CCC`; step 2: move to `ZZZ`). Using your input, write a program to determine how many steps it takes to get from location `AAA` to location `ZZZ`?

### Part 2

Turns out the map is multidimensional. You can't just follow the single path from `AAA` to `ZZZ` -- you need to follow all paths that lead from locations ending in `A` to locations ending in `Z`. Only once all paths lead to `Z` are you done.

Example:
```
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
```

1. There are two starting points (locations that end in `A`): `11A` and `22A`
2. The first direction is `L`, which we need to apply to both starting points. This leads us to `11B` and `22B`.
3. Next is `R`, leading us to `11Z` and `22C`. We've reached one end point (`11Z`, because it ends in `Z`), but not both. So, we have to keep going on both paths.
4. Next is `L`, leading us to `11B` and `22Z`. Again, only one path is at an end point, so we must keep going.
5. Next is `R`, leading us to `11Z` and `22B`.
6. Next is `L`, leading us to `11B` and `22C`.
7. Next is `R`, leading us to `11Z` and `22Z`. Finally both paths lead to an end point, so we're done.

It took `6 steps` for all paths to reach an end point. Write a program that determines the number of steps for all paths to reach their end points at the same time for your input.