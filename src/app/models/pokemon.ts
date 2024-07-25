import { Sprite } from "./sprite";
import { Stats } from "./stats";
import { Type } from "./type";

export interface Pokemon {
    id: number;  
    name: string;
    url: string;
    order: number;
    sprites: Sprite;
    stats: Array<Stats>;
    types: Array<Type>;
}