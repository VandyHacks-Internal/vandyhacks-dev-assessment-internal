// import pokemon from './pokemonWeight.json';

// I'm not making an interface with every fucking Pokemon in it
interface PokemonWeightMap {
  [key: string]: number;
}

export function solve(input: string): { answer: number[] } {
  const theirPokemons: string[] = JSON.parse(input);

  return {
    answer: [1],
  };
}
