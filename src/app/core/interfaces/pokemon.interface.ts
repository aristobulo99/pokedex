import { PokemonTypeName } from "./pokemonTypeName.interface";

export interface NameIcon{
    name_icon: string;
}

export interface NameUrl {
    name: string;
    url: string;
}

export interface ResultPokemon {
    results: NameUrl[]
}

export interface SlotType {
    slot: number;
    type: {
        name: PokemonTypeName;
        url: string;
    }
    url: string;
}

export interface SpritesGeneration {
    "brilliant-diamond-and-shining-pearl": NameIcon;
    front_default: string
}

export interface OtherSprintes {
    showdown: SpritesGeneration;
    dream_world: {
        front_default: string
    }
}

export interface Sprites {
    front_default: string;
    "generation-viii": SpritesGeneration;
    other: OtherSprintes
}

export interface Stats {
    base_stat: number;
    effort: number;
    stat: NameUrl
}

export interface flavorTextEntries {
    flavor_text: string;
    language: NameUrl
}

export interface Abilities {
    ability: NameUrl
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    types: SlotType[];
    sprites: Sprites;
    stats: Stats[];
}

export interface PokemonDetail extends Pokemon{
    species: NameUrl;
    pokemonSpecies?: PokemonSpecies;
    abilities: Abilities[];
    evolution: Pokemon[];
}

export interface PokemonSpecies{
    evolution_chain: NameUrl;
    flavor_text_entries: flavorTextEntries[]
}

export interface Chain {
    species: NameUrl;
    evolves_to: Chain[]
}

export interface EvolutionChain {
    chain: Chain
}