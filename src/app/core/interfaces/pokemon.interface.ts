
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
    type: NameUrl;
    url: string;
}

export interface SpritesGeneration {
    "brilliant-diamond-and-shining-pearl": NameIcon;
    front_default: string
}

export interface OtherSprintes {
    showdown: SpritesGeneration;
}

export interface Sprites {
    "generation-viii": SpritesGeneration;
    other: OtherSprintes
}

export interface Stats {
    base_stat: number;
    effort: number;
    stat: NameUrl
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    types: SlotType[];
    sprites: Sprites;
    stats: Stats
}