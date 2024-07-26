import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Type } from '../models/type';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from '../services/storage.service';
import { SearchComponent } from '../search/search.component';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, star, trophy } from 'ionicons/icons';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, SearchComponent]
})
export class PokemonPage implements OnInit {
  id: number = 0;
  pokemon: any;
  description: string = "";
  types: Type[] = [];
  isFavoris: boolean = false;
  textFavoris: string = "";
  isTeam: boolean = false;
  textTeam: string = "";
  teamKey: string = "TEAM_KEY";
  teamStorage: any = {};
  errorMsg: string = "";

  constructor(private route: ActivatedRoute, private navController: NavController, private apiSrv: ApiService, private storageSrv: StorageService, private router: Router) { 
    addIcons({ star, trophy, arrowBack, arrowForward });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.apiSrv.getPokemonByParam(this.id).subscribe({
      next: (response: any) => {
        // console.log(response);
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
        this.getTeam();
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

  async getTeam() {
    let storage = await this.storageSrv.getTeam();

    if (storage != null) {
      for (let x = 0; x < 6 ; x++) {
        if (storage[x] == this.pokemon?.name) {
          this.isTeam = true;
        }
      }
    }
    
    this.teamText();
  }

  async team() {
    let storage = await this.storageSrv.getTeam();

    if (this.isTeam) {
      if (storage != null) {
        this.teamStorage = storage;

        for (let x = 0; x < 6 ; x++) {
          if (this.teamStorage[x] == this.pokemon?.name) {
            this.teamStorage[x] = undefined
          }
        }

        await this.storageSrv.addTeam(this.teamStorage);
        this.isTeam = false;
      } else {
        await this.storageSrv.removeTeam();
        this.isTeam = false;
      }
    } else {
      if (storage != null) {
        this.teamStorage = storage;
  
        for (let x = 0; x < 6 ; x++) {
          // if (this.teamStorage[x] != undefined) {
          //   this.errorTeam();
          // }
          if (this.teamStorage[x] != this.pokemon?.name && this.teamStorage[x] == undefined) {
            console.log("here");
            this.teamStorage[x] = this.pokemon?.name;
            break;
          }
        }
  
        await this.storageSrv.addTeam(this.teamStorage);
        this.isTeam = true;
      } else {
        await this.storageSrv.addTeam({ 0: this.pokemon?.name});
        this.isTeam = true;
      }
    }

    this.teamText();
  }

  teamText() {
    this.textTeam = this.isTeam ? "Retirer de mon équipe" : "Ajouter à mon équipe";
  }

  errorTeam() {
    // console.log("here");
    this.errorMsg = "L'équipe est déjà au complet";
    this.isTeam = false;
  }

  previous(id: number) {
    this.router.navigate(['/pokemon', (id - 1)]);
  }

  next(id: number) {
    this.router.navigate(['/pokemon', (id + 1)]);
  }

  myFavourites() {
    this.router.navigate(['/favourites']);
  }

  myTeam() {
    this.router.navigate(['/team']);
  }

  goBack() {
    this.navController.back();
  }

}
