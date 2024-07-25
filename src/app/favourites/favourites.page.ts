import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { star } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, SearchComponent]
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];

  constructor(private navController: NavController, private apiSrv: ApiService, private storageSrv: StorageService, private router: Router) { 
    addIcons({ star })
  }

  async ngOnInit() {
    this.apiSrv.getPokemons().subscribe({
      next: (response: any) => {
        if (response.results) {
          response.results.forEach(async (pokemon: any) => {
            let idStored = await this.storageSrv.getFavourite(pokemon.name);

            if (idStored != null) {
              this.updateFavourites(idStored);
            }
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getPokemon(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
  
  updateFavourites(id: number) {
    this.apiSrv.getPokemonByParam(id).subscribe({
      next: (response: any) => {
        if (response.name) {
          this.favourites.push({
            id: response.id,
            name: response.name,
            sprite: response.sprites.front_default,
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  myFavourites() {
    this.router.navigate(['/favourites']);
  }

  goBack() {
    this.navController.back();
  }

}
