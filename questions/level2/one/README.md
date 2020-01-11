# Level 2, Problem 1
The goal of this problem is to test your ability to make web requests. A frequent operation that we have to do in VandyHacks is have our website retrieve data from the backend. For example, when a hacker loads Vaken (our hackathon registration system, open sourced [here](https://github.com/Vandyhacks/vaken)), we have to load if they've been accepted to VandyHacks as well as their name and such. In this problem, you'll be using an API from the European Central Bank that helps you convert currencies.

https://api.exchangeratesapi.io/2010-01-10

That specific URL will give you a JSON describing the conversion rate between the Euro and various currencies across the world on January 10th, 2010 (European style dating!). You could (and will have to) change the date to receive the exchange rate for another day.

For this problem, you'll be provided a JSON array of dates in `YYYY-MM-DD` format (this is the exact same format the API uses. You should NOT have to change it).

## Question
Return a JSON array with the conversion between GBP (that's the British pound) and the euro for each of the dates provided in the input array.

## Answer Format
The JSON array with the `GBP` value for each date should be in a file called `currency.json`.