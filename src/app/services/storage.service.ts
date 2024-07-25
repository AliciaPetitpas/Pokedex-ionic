import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  async addFavourite(pokemonName: string, pokemonId: number) {
    await Preferences.set({
      key: pokemonName,
      value: pokemonId.toString(),
    })
  }

  async getFavourite(pokemonName: string) {
    const { value } = await Preferences.get({ key: pokemonName });

    if (value) {
      return JSON.parse(value);
    }
  }

  async removeFavourite(pokemonName: string) {
    await Preferences.remove({ key: pokemonName });
  }
}
