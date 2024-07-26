import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private teamKey: string = "TEAM_KEY";

  constructor() { }

  async addFavourite(pokemonName: string, pokemonId: number) {
    await Preferences.set({
      key: pokemonName,
      value: pokemonId.toString(),
    })
  }

  async addTeam(data: any) {
    await Preferences.set({
      key: this.teamKey,
      value: JSON.stringify(data),
    })
  }

  async getFavourite(pokemonName: string) {
    const { value } = await Preferences.get({ key: pokemonName });

    if (value) {
      return JSON.parse(value);
    }
  }

  async getTeam() {
    const { value } = await Preferences.get({ key: this.teamKey });

    if (value) {
      return JSON.parse(value);
    }
  }

  async removeFavourite(pokemonName: string) {
    await Preferences.remove({ key: pokemonName });
  }

  async removeTeam() {
    await Preferences.remove({ key: this.teamKey });
  }
}
