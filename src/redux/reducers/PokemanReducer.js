import { createSlice } from "@reduxjs/toolkit";

const initialPokemanState = {
  nextPage: "",
  pokemansDetails: [],
};

const pokemanSlice = createSlice({
  name: "pokeman",
  initialState: initialPokemanState,
  reducers: {
    setPokemansDetails: (state, action) => {

      const uniquePokemonNames = new Set(state.pokemansDetails.map(pokemon => pokemon.name));
      const newPokemonWithDetails = action.payload.pokemonWithDetails.filter(pokemon => !uniquePokemonNames.has(pokemon.name));

      return {
        ...state,
        nextPage: action.payload.nextPage,
        pokemansDetails: [
          ...state.pokemansDetails,
          ...newPokemonWithDetails,
        ],
      };
    },
  },
});

export const pokemanActions = pokemanSlice.actions;

export default pokemanSlice.reducer;
