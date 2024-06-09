import { useState, useEffect } from "react";

import { PokemonDetailed } from "./models/pokemon";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import { URL } from "./utils/constants";
import { usePokemonSWR } from "./hooks/usePokemonSWR";
// import { usePokemonMutation } from "./hooks/usePokemonMutation";

function App() {
  const [url, setUrl] = useState<string>(URL);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const { data, error, isLoading, isValidating } = usePokemonSWR({
    url,
    setNextUrl,
    setPrevUrl,
  });

  // const { trigger, data, error } = usePokemonMutation({
  //   url,
  //   setNextUrl,
  //   setPrevUrl,
  // });

  // useEffect(() => {
  //   trigger();
  // }, [url, trigger]);

  const handleNext = async () => {
    if (!nextUrl) return;
    setUrl(nextUrl);
    window.scrollTo(0, 0);
  };

  const handlePrev = async () => {
    if (!prevUrl) return;
    setUrl(prevUrl);
    window.scrollTo(0, 0);
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading && !isValidating) return <div>Loading...</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center bg-red-100 h-full w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 justify-center">
          {data &&
            data.map((pokemon: PokemonDetailed, i: number) => (
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
