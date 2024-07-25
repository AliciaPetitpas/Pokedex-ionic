import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

  getPokemons() {
    return this.http.get(this.apiUrl);
  }

  getPokemon(url: string) {
    return this.http.get(url);
  }

  getPokemonByParam(param: number | string) {
    return this.http.get(this.apiUrl + '/' + param);
  }

  getPokemonDescriptions(url: string) {
    return this.http.get(url);
  }
}
