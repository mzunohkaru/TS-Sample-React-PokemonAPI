import useSWR from "swr";

import { PokemonDetailed, ResponsePokemonAPI } from "../models/pokemon";

type UsePokemonSWRProps = {
  url: string;
  setPokemonDetails: (details: PokemonDetailed[]) => void;
  setNextUrl: (url: string) => void;
  setPrevUrl: (url: string) => void;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export function usePokemonSWR({
  url,
  setPokemonDetails,
  setNextUrl,
  setPrevUrl,
}: UsePokemonSWRProps) {
  const { data, error, isLoading, isValidating } = useSWR(url, fetcher, {
    onSuccess: async (data: ResponsePokemonAPI) => {
      const details = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );
      console.log("DEBUG: details", details);
      setPokemonDetails(details);
      setNextUrl(data.next ?? "");
      setPrevUrl(data.previous ?? "");
    },
    onError: (error) => {
      console.error("Error: fetching data", error);
    },
  });

  return { data, error, isLoading, isValidating };
}
