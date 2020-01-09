# Level 1, Problem 1
At VandyHacks, we use NFC wristbands to check people into meals and events. This gives us a rich dataset we can analyze for trends. In this problem, you'll be working with a similar dataset (note: this isn't real data from VandyHacks). You'll be given a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) with sample NFC checkin data. 

## Questions
Answer these two questions using **code** (not Excel or similar).
1. How many people came between time start and time end?
2. During which hour did the most poeple checkin?


## Answer Format
For question 1, you should have a single integer as your answer. Put that in a file called `nfc_one.txt` with no spaces, tabs, units or newlines.

For question 2, your answer should be in the form of an hour range. For example, if 100 people come between 16:00 and 17:00 and 50 people come between 17:00 and 18:00, the hour range with the most people is between 16:00 and 17:00. You should take the leading hour of this range and return just the hour. In this problem, your answer would be `16`. Write that to `nfc_two.txt` with no spaces, special characters, zeroes (unless your answer is `10` or `20`), units or newlines.