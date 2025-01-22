import { TemplateRef } from "@angular/core";
import { PokemonTypeName } from "./pokemonTypeName.interface";

export interface DialogData {
    width: string,
    pokemonTypeName: PokemonTypeName
    templete?: TemplateRef<any>,
}