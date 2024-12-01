# Advent of Code 2023
## Day 2: *Cube Conundrum*

### Part 1

Consider a game where a random set of colored cubes (green, blue & red) are placed in a bag and jumbled up. Each game involves blindly reaching into the bag and pulling out a random subset of cubes. The amount of each color is recorded in the provided input file.
An example input for a few games is provided here:

```
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
```

Each "hand" is separated by a semicolon. So for game 1, the first hand included 3 blue cubes and 4 red cubes. Those were returned to the bag before the next hand was drawn (in this casee, 1 red cube, 2 green cubes and 6 blue cubes).

The task: write a program that determines which games would be possible if the bag contained only `12 red cubes, 13 green cubes, and 14 blue cubes`?

For example, game 3 would be impossible with this setup, because one hand included 20 red cubes; however, there are only 12 red cubes.

Your program should determine which games ARE possible, and sum their IDs.

### Part 2

Now, consider the inverse. For each game, what is the minimum number of each cube that would be required to get that result?

For example, given this sample input from earlier:

```
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
```

Game 1 would need to be played with a minimum of `4 red, 2 green, and 6 blue` cubes. Any less of any of these colors, and the given result would have been impossible.

Your program should:
1. Determine the minimum cube count for each game, e.g. `4 red, 2 green and 6 blue` for game 1 above. 
2. Multiply the minimum cube counts together for each game, e.g. game 1 would produce the value 48.
3. Sum the multiplied values for all games together.

The final result should be the sum calculated in step 3.