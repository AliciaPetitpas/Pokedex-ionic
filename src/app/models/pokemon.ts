import { Abilitie } from "./abilitie";
import { Sprite } from "./sprite";
import { Stats } from "./stats";
import { Type } from "./type";

export interface Pokemon {
    id: number;  
    name: string;
    url: string;
    order: number;
    sprites: Sprite;
    stats: Stats[];
    types: Type[];
    abilities: Abilitie[];
}