# Advent of Code 2023
## Day 6: *Wait For It*

### Part 1

Model boats are being raced, but it's a race to see who can get furthest (in millimeters) in a set amount of time (in milliseconds). Before a boat can move, it has to be "charged" by pushing a button on top of it. Rules of the race:

* For each millisecond the button is held down, the boat goes one millimeter per millisecond faster.
* The boat starts charging after the race starts. So, the longer you spend charging the boat, the less time you have to race.
* The boat can't move until the button is released. If you hold the button until the end of the race, the boat travels zero millimeters.
* The starting speed of the boat is zero.

Example race:
```
Time:     7
Distance: 9
```

The describes a race that lasts 7 milliseconds. The current record distance that a boat has traveled in this race is 9 millimeters.

Breaking this down, we can see that there are several ways to beat this distance record:
1. Hold the button for 2 milliseconds. This only gives us 5 milliseconds to race, but the boat is now going 2 millimeters per millisecond, meaning we can travel 10 millimeters in the remaining time.
2. Holding the button for 3 milliseconds allows us to travel 12 millimeters in the remainning 4 milliseconds.
3. Similarly for 4 milliseconds. The 3 remaining milliseconds allows us to travel 12 millimeters.
4. Finally, holding the button for 5 milliseconds allows us to travel 10 millimeters in the remaining 2 milliseconds of the race.

All other options traverse less distance than the record.

This race has `4 ways` to beat the record distance. The given input file describes several races. Write a program to find out `how many ways there are to beat each race's record distance` in the time allotted. Multiply these numbers together to get the final result.

Example input file format:
```
Time:      7  15   30
Distance:  9  40  200
```

### Part 2

Turns out the input file format just has a bunch of unnecesary (and confusing) space bettween the numbers. It actually only describes one race, meaning the example above describes a race that lasts `71530` milliseconds, and the record distance recorded is `940200` millimeters.

Just like part 1, write a program that calculates how many ways there are to beat the record distance in the time allotted, but using this new input file parsing method.