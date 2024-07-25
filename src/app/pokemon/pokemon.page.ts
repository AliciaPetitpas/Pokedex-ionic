import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Type } from '../models/type';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class PokemonPage implements OnInit {
  id: number = 0;
  pokemon: any;
  description: string = "";
  types: Type[] = [];
  isFavoris: boolean = false;
  textFavoris: string = "";

  constructor(private route: ActivatedRoute, private navController: NavController, private apiSrv: ApiService, private storageSrv: StorageService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.apiSrv.getPokemonByParam(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.name) {
          this.pokemon = response;

          response.types.forEach((type: any) => {
            this.types.push({
              name: type.type.name,
              url: type.type.url,
            });
          })
        }
      },
      error: (err) => {
        console.log(err);
      }, complete: () => {
        // console.log(this.types);
        this.getDescriptions(this.pokemon?.species.url);
        this.getFavourite();
      }
    })
  }

  getDescriptions(url: string) {
    this.apiSrv.getPokemonDescriptions(url).subscribe({
      next: (response: any) => {
        // console.log(response);
        if (response.flavor_text_entries) {
          this.description = response?.flavor_text_entries[1].flavor_text.replace("", " ");
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  async getFavourite() {
    let storage = await this.storageSrv.getFavourite(this.pokemon?.name);

    if (storage != null) {
      this.isFavoris = true;
    }
    
    this.favouriteText();
  }

  async favourite() {
    if (this.isFavoris) {
      await this.storageSrv.removeFavourite(this.pokemon?.name);
      this.isFavoris = false;
    } else {
      await this.storageSrv.addFavourite(this.pokemon?.name, this.pokemon?.id);
      this.isFavoris = true;
    }

    this.favouriteText();
  }

  favouriteText() {
    this.textFavoris = this.isFavoris ? "Retirer des favoris" : "Ajouter aux favoris";
  }

  goBack() {
    this.navController.back();
  }

}
