import useSWRMutation from "swr/mutation";
import { useState } from 'react';

import { PokemonDetailed, ResponsePokemonAPI } from "../models/pokemon";
import { fetcher } from "../lib/fetch";

type UsePokemonMutationProps = {
  url: string;
  setNextUrl: (url: string) => void;
  setPrevUrl: (url: string) => void;
};

export function usePokemonMutation({
  url,
  setNextUrl,
  setPrevUrl,
}: UsePokemonMutationProps) {
  const [details, setDetails] = useState<PokemonDetailed[]>([]);
  
  const { trigger, data, error } = useSWRMutation(url, fetcher, {
    onSuccess: async (data: ResponsePokemonAPI) => {
      const fetchedDetails: PokemonDetailed[] = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );
      console.log("DEBUG: details", fetchedDetails);
      setDetails(fetchedDetails);
      setNextUrl(data.next ?? "");
      setPrevUrl(data.previous ?? "");
    },
    onError: (error) => {
      console.error("Error: fetching data", error);
    },
  });

  return { trigger, data: details, error };
}