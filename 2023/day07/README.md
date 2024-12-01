# Advent of Code 2023
## Day 7: *Camel Cards*

### Part 1

Camel Cards is a game similar to poker, except it can be done while riding on an unstable vehicle. Or animal. (Such as a camel.)

Anyway, you're given an input listing card hands, along with a bid amount for that hand. Cards in a hand can be one of the following:

`A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2`

This also describes their relative worth -- `A` is worth the most, and `2` is worth the least. A hand of cards in the input looks like this: `AAJ43`

Every hand has exactly one type, which determines how good the hand is. The possible types (from strongest to weakest) are:

* Five of a kind: all five cards are the same, e.g. `QQQQQ`
* Four of a kind: four cards are the same, e.g. `QQQQ5`
* Full house: Three cards have the same label, and the other two cards have another label, e.g. `5QQQ5`
* Three of a kind: Three cards have the samee label, but in this case the other cards are each different, e.g. `Q4QQ3`
* Two pair: Two cards share the same label, another two cards share a different label, and a third has yet another label, e.g. `Q45Q4`
* One pair: Two cards share the same label, but every other card has a different label, e.g. `Q97Q5`
* High card: All cards have a different label, e.g. `Q72J4`

If two hands have the same type, individual cards must be compared from left to right to see which hand is strongest. See the list of card types earlier for the ranking. For example, both `Q4QQQ` and `QQ4QQ` are type `four of a kind`, so individual cards must be compared. Moving from left to right, both hands have the same first card (`Q`), so it's still a tie. Moving to the next card, one hand has `4` and the othere hand has `Q`. Since `Q` is stronger than `4`, the second hand is stronger.

The input of card hands and bids looks like this:
```
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
```

Your task is to write a program that:
* Ranks a list of hands from weakest to strongest using the above criteria.
* Gives each bid a bonus multiplier based on its ranking position. Using the example above, the weakest hand's bid would get multiplied by 1, the next strongest hand's bid would get multiplied by 2, all the way up to the strongest hand's bid, which would get multiplied by 5 (since there are a total of 5 hands in this example).
* Sum the final calculated bids together. This is the final result.

For the example above, the final result would be `6440`.

### Part 2

Jokers are wild! The `J` card now represents a joker, which changes the rules in two ways:

* Any `J` card can now pretend to be whatever card makes the hand strongest in terms of type. For example, in part 1, the hand `JQQJJ` would have been a `full house`. But now, the `J` is counted as additional `Q` cards, making the hand `five of a kind`.
* To compensate for this advantage, the `J` card is now weaker than any other card when ranked against other cards. This means that the new relative ranking of card strenths is: `A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J`. During a tie break, the `J` card is counted as a `J` card, not the card it pretends to be.

Example: both `JTJTJ` and `TJTJJ` would be type `five of a kind` under these new rules. However, when we resolve the tie by comparing cards left to right, the first hand's first card is `J` and the second hand's first card is `T`. Since `J` is now the weakest card, the second hand is stronger.

Your task: modify your program to handle these new rules, and rerun the bid calculations based on the new ranking.

For the example above, the final result under these new rules would be `5905`.