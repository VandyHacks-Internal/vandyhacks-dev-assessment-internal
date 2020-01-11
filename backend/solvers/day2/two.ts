import fetch from 'node-fetch';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const getApiURL = (pokemon: string) => {
  return `${API_URL}${pokemon}/`;
};

const fetchByPokemon = async (pokemon: string): Promise<number> => {
  return (await (await fetch(getApiURL(pokemon))).json()).weight;
};

export async function solve(input: string): Promise<{ answer: number[] }> {
  const pokemons = JSON.parse(input);

  return {
    answer: await Promise.all(
      pokemons.map(async (pokemon: string): Promise<number> => fetchByPokemon(pokemon)),
    ),
  };
}
