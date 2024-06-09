import { useState } from "react";

import { PokemonDetailed } from "./models/pokemon";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import { URL } from "./constants";
import { usePokemonSWR } from "./hooks/usePokemonSWR";

function App() {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailed[]>([]);
  const [url, setUrl] = useState<string>(URL);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const { data, error, isLoading, isValidating } = usePokemonSWR({
    url,
    setPokemonDetails,
    setNextUrl,
    setPrevUrl,
  });

  const handleNext = async () => {
    if (!nextUrl) return;
    setUrl(nextUrl);
  };

  const handlePrev = async () => {
    if (!prevUrl) return;
    setUrl(prevUrl);
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading && !isValidating) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center bg-red-100 h-full w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 justify-center">
          {pokemonDetails &&
            pokemonDetails.map((pokemon: PokemonDetailed, i: number) => (
              <Card key={i} pokemon={pokemon} />
            ))}
        </div>
        <div className="flex items-center justify-center gap-4 my-4">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              prevUrl ? "bg-orange-500" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handlePrev}
            disabled={!prevUrl}
          >
            Prev
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              nextUrl ? "bg-orange-500" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleNext}
            disabled={!nextUrl}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
