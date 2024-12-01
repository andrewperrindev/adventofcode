# Advent of Code 2023
## Day 19: *Aplenty*

### Part 1

Given a set of workflows, and a set of part descriptors, calculate which parts are accepted (`A`) and which parts are rejected (`R`). The input looks like the following example:

```
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
```

The first set of the input (before the empty line) describes the workflows. Each line is a separate workflow, and starts with its name, e.g. `px`. Between the brackets describes various conditions that the part must satisfy in order to move to the next workflow. For example, in the `px` workflow, a part must have an `a` less than `2006` in order to proceed to the `qkq` workflow. If no conditions match, then the last item in the workflow is the default workflow to execute next, or the final endstate (either `A` or `R`).

The second set of input describes the parts. Each line is a separate part. Each part has various ratings for `x`, `m`, `a` or `s`. Starting at the `in` workflow, run each part through the workflows until either an `A` or `R` state is achieved.

The final result is the total sum of the `x`, `m`, `a` and `s` values for every accepted (`A`) part.