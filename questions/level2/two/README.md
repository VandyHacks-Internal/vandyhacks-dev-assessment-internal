# Level 2, Problem 2
The goal of this problem is to test your ability to make web requests. A frequent operation that we have to do in VandyHacks is have our website retrieve data from the backend. For example, when a hacker loads Vaken (our hackathon registration system, open sourced [here](https://github.com/Vandyhacks/vaken)), we have to load if they've been accepted to VandyHacks as well as their name and such. 

In this problem, you'll be using a Pokémon API (if you don't know anything about Pokémon, don't worry: you don't have to have any specific knowledge about Pokémon). Here's an example usage of it:

https://pokeapi.co/api/v2/pokemon/rayquaza/

That specific URL will give you a JSON describing a bunch of details about a Pokémon called [Rayquaza](https://www.pokemon.com/us/pokedex/rayquaza).

## Question
For this problem, you'll be provided a JSON array with the names of many Pokémon. Return a JSON array (with the same order) containg the weight (as returned by the API) of each of them. 

## Answer Format
The JSON array should be in this folder in a file called `pokemon.json`. 