import { all, call, put, takeEvery } from "redux-saga/effects";

import { fetchPokemonList, fetchPokemonDetails } from "../api/pokemonApi";
import { pokemanActions } from "../redux/reducers/PokemanReducer";

function* fetchPokemonDataSaga(action) {
  try {
    const data = yield call(fetchPokemonList, action.payload);
    const pokemonWithDetails = yield all(
      data.results.map(function* (pokemon) {
        const details = yield call(fetchPokemonDetails, pokemon.name);
        return { ...pokemon, details };
      })
    );

    const pokemonData = {
      nextPage: data.next,
      pokemonWithDetails: pokemonWithDetails,
    };

    yield put(pokemanActions.setPokemansDetails(pokemonData));
  } catch (error) {
    console.log("error", error);
  }
}

export function* apiSaga() {
  yield takeEvery("FETCH_POKEMON_DATA", fetchPokemonDataSaga);
}