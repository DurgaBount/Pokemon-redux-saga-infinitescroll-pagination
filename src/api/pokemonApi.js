import { BASE_URL } from "../helpers/constants";

export async function fetchPokemonList(url) {
  return fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
      return data;
    })
    .catch((err) => {
      console.error("Error fetching Pokemon list:", err);
      throw err; // You might want to propagate the error further up
    });
}

export async function fetchPokemonDetails(pokemonName) {
  return fetch(`${BASE_URL}/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      console.error("Error fetching Pokemon Details:", err);
      throw err; // You might want to propagate the error further up
    });
}
