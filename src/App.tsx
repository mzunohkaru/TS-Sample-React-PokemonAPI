import React, { useEffect, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Pokemon, ResponsePokemonAPI, PokemonDetailed } from "./models/pokemon";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonDetailed[]>([]);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res: ResponsePokemonAPI = await getAllPokemon(URL);
      // console.log(res.results);
      loadPokemon(res.results);
      setPrevUrl(res.previous);
      setNextUrl(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: Pokemon[]) => {
    const _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        const pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    const res: ResponsePokemonAPI = await getAllPokemon(prevUrl);
    loadPokemon(res.results);
    setPrevUrl(res.previous);
    setNextUrl(res.next);
    setLoading(false);
  };

  const handleNext = async () => {
    if (!nextUrl) return;
    setLoading(true);
    const res: ResponsePokemonAPI = await getAllPokemon(nextUrl);
    loadPokemon(res.results);
    setPrevUrl(res.previous);
    setNextUrl(res.next);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center bg-red-100 h-full w-full">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 justify-center">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="flex items-center justify-center gap-4 my-4">
              <button
                className={`bg-orange-500 text-white px-4 py-2 rounded-md ${
                  !prevUrl ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handlePrev}
                disabled={!prevUrl}
              >
                Prev
              </button>
              <button
                className={`bg-orange-500 text-white px-4 py-2 rounded-md ${
                  !nextUrl ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleNext}
                disabled={!nextUrl}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
