import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonData } from "../../redux/reducers/PokemanActions";
import PokemonCard from "../../components/pokemonCard";
import { firstPageDataUrl } from "../../helpers/constants";
import "./styles.css";

const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemansDetails = useSelector((state) => state.pokeman.pokemansDetails);
  const nextPage = useSelector((state) => state.pokeman.nextPage);
  const observer = useRef(null);
  const loadMoreRef = useRef(null);
  const isLoadingMore = false;

  useEffect(() => {
    if (!pokemansDetails?.length) {
      dispatch(fetchPokemonData(firstPageDataUrl));
    }
  }, [dispatch,pokemansDetails?.length]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries[0].isIntersecting && !isLoadingMore) {
        dispatch(fetchPokemonData(nextPage));
      }
    });

    if (observer.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch, nextPage, isLoadingMore]);

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <div className="pokemon-cards-row">
        {pokemansDetails?.map((pokeman, index) => (
          <PokemonCard
            pokeman={pokeman}
            key={pokeman?.details?.id}
            index={index}
          ></PokemonCard>
        ))}
      </div>
      <div ref={loadMoreRef}>Loading more...</div>
    </div>
  );
};

export default PokemonsList;
