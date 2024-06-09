import React from "react";
import { PokemonDetailed } from "../models/pokemon";

export const Card = ({ pokemon }: { pokemon: PokemonDetailed }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-2xl w-64 h-106">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 shadow-md"
      />
      <h3 className="text-xl font-bold mt-2 shadow-sm">{pokemon.name}</h3>
      <div className="flex flex-col items-center mt-2">
        <div className="font-semibold shadow-sm">タイプ</div>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className="px-2 py-1 bg-gray-200 rounded-full text-sm shadow-sm"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col items-center mt-3">
          <p className="shadow-sm">高さ: {pokemon.height} m</p>
          <p className="shadow-sm">重さ: {pokemon.weight} kg</p>
          <p className="font-semibold mt-2 shadow-sm">アビリティ</p>
          <div>
            {pokemon.abilities.map((ability) => (
              <p key={ability.slot} className="shadow-sm">
                {ability.ability.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
