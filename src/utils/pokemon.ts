import { ResponsePokemonAPI, PokemonDetailed } from "../models/pokemon";

export const getAllPokemon = (url: string) => {
  return new Promise<ResponsePokemonAPI>((resolve, reject) => {
    fetch(url)
      // JSON形式に変換
      .then((res) => res.json())
      // データを返す
      .then((data: ResponsePokemonAPI) => resolve(data))
      // エラーが返った場合はエラーを返す
      .catch((err) => reject(err));
  });
};

export const getPokemon = (url: string) => {
  return new Promise<PokemonDetailed>((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data: PokemonDetailed) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};
