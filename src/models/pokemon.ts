import { z } from "zod";

export const PokemonSchema = z.object({
  name: z.string(),
  url: z.string(),
});
export type Pokemon = z.infer<typeof PokemonSchema>;

export const ResponsePokemonAPISchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PokemonSchema),
});
export type ResponsePokemonAPI = z.infer<typeof ResponsePokemonAPISchema>;

export const PokemonDetailedSchema = z.object({
  abilities: z.array(z.object({
    ability: PokemonSchema,
    is_hidden: z.boolean(),
    slot: z.number(),
  })),
  base_experience: z.number(),
  cries: z.object({
    latest: z.string(),
    legacy: z.string(),
  }),
  forms: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })),
  game_indices: z.array(z.object({
    game_index: z.number(),
    version: z.object({
      name: z.string(),
      url: z.string(),
    }),
  })),
  height: z.number(),
  held_items: z.array(z.any()),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string(),
  moves: z.array(z.object({
    move: z.object({
      name: z.string(),
      url: z.string(),
    }),
    version_group_details: z.array(z.object({
      level_learned_at: z.number(),
      move_learn_method: z.object({
        name: z.string(),
        url: z.string(),
      }),
      version_group: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })),
  })),
  name: z.string(),
  order: z.number(),
  past_abilities: z.array(z.any()),
  past_types: z.array(z.any()),
  species: z.object({
    name: z.string(),
    url: z.string(),
  }),
  sprites: z.object({
    back_default: z.string().nullable(),
    back_female: z.string().nullable(),
    back_shiny: z.string().nullable(),
    back_shiny_female: z.string().nullable(),
    front_default: z.string(),
    front_female: z.string().nullable(),
    front_shiny: z.string().nullable(),
    front_shiny_female: z.string().nullable(),
  }),
  stats: z.array(z.object({
    base_stat: z.number(),
    effort: z.number(),
    stat: z.object({
      name: z.string(),
      url: z.string(),
    }),
  })),
  types: z.array(z.object({
    slot: z.number(),
    type: z.object({
      name: z.string(),
      url: z.string(),
    }),
  })),
  weight: z.number(),
});
export type PokemonDetailed = z.infer<typeof PokemonDetailedSchema>;

