# Advent of Code 2023
## Day 4: *Scratchcards*

### Part 1

The provided input file is a list of lottery results. Each row ("card") is a separate result. The numbers on the left of the pipe (|) are the winning numbers. The numbers on the right of the pipe is your randomly generated entry.

Example input:
```
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
```
Your task is to write a program that:
1. Determines which of the random numbers exist in the list of winning numbers on each card. In the example above, card 1 has four matching numbers (48, 83, 17 & 86).
2. Determines the score for each card: the first match is a score of 1. Every subsequent match doubles the previous score. Using card 1 as an example again, the four matching numbers means we get a final total of 8 (1 -> 2 -> 4 -> 8).
3. Sums all the scores together.

The final result should the sum from step 3.

### Part 2

Now let's say these are magical lottery cards. Instead of awaarding you points for matching numbers, you instead get more cards. Specifically, you get duplicates of other cards in your possession: each match rewards you with another copy of a subsequent card.

If we look at the prior example again:
```
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
```
Card 1 has four matches. This rewards us with duplicates of the subsequent 4 cards (2, 3, 4 and 5). After processing our winnings for card 1, we now find ourselves with not only our original 6 cards, but also a second copy of cards 2, 3, 4 & 5.

You must always use the card numbers in the input to determine which ones to duplicate. For example, after calculating our "winnings" from card 1, we now have two copies of "Card 2". "Card 2" has two matching numbers, and should always produce duplicates of cards "Card 3" & "Card 4" as defined in the input.

Write a program that processes the "winnings" from these magical cards. The final result should be the total number of cards in your possession after all your "wins" are calculated.

NOTE: A card will not generate a duplicate of a card that doesn't exist. You can see this in the example above: card 6 has no matching numbers because there are no cards after 6 to duplicate.