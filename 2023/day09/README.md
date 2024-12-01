# Advent of Code 2023
## Day 9: *Mirage Maintenance*

### Part 1

Given a list of values, you need to extrapolate what the next value in the sequence is. This is done by calculating the difference between numbers in the given row to form a new row. Continue doing this until you get a row that contains only zeros.

Example:
* Given the row `0 3 6 9 12 15`, you would first calculate the differences between the numbers. So, the difference between 0 & 3 is 3. The difference between 3 & 6 is 3, etc.
* Doing this for the whole row yields a new row: `3 3 3 3 3`. Note that this row has one less element than the previous row. Since this row doesn't contain all zeros, we just apply the same algorithm to this row.
* The row we arrive at is `0 0 0 0`. Since we now have a row of all zeros, we're done.

To extrapolate the next value, we start at the row of zeros and work up the list, like so:
* Start at the zero row, with a value of 0.
* Moving up to the row of threes, we take the previous value (0) and add it to the last value in this row (3), which gives us a value of 3.
* Moving up to the top row, we take the previous value (3) and add it to the last value in this row (15), which gives us a value of 18.

Thus, `18` is the extrapolated value for this row of values.

Here is a complete example input:
```
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
```

Using the same algorithm as above on the second example row, you would get something like this:
```
1   3   6  10  15  21
  2   3   4   5   6
    1   1   1   1
      0   0   0
```

After extrapolating the value, we get `28`.

Write a program that takes input similar to the example, and extrapolates the next value for each row of values. Your final result is the sum of all extrapolated values. For the example above, this value is `114`.


### Part 2

If we can extrapolate the next number in the sequence, can we also extrapolate the value that precedes the first value?

In other words, using the first example from part 1, can we extrapolate the number that comes before `0`, instead of the number that comes after `15`?

If you do this for the example input, and sum the extrapolated values together, you should get `2`.