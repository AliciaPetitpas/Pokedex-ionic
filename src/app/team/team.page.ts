import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { addIcons } from 'ionicons';
import { star, trophy } from 'ionicons/icons';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, SearchComponent]
})
export class TeamPage implements OnInit {
  teamKey: string = "TEAM_KEY";
  team: any[] = [];

  constructor(private router: Router, private navController: NavController, private apiSrv: ApiService, private storageSrv: StorageService) { 
    addIcons({ star, trophy })
  }

  ngOnInit() {
    this.apiSrv.getPokemons().subscribe({
      next: (response: any) => {
        if (response.results) {
          response.results.forEach(async (pokemon: any) => {
            let teamStored = await this.storageSrv.getTeam();

            for (let x = 0; x < 6; x++) {
              if (teamStored[x] == pokemon.name) {
                this.updateTeam(pokemon.name);
              }
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

  updateTeam(name: string) {
    this.apiSrv.getPokemonByParam(name).subscribe({
      next: (response: any) => {
        if (response.name) {
          this.team.push({
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

  myTeam() {
    this.router.navigate(['/team']);
  }

  goBack() {
    this.navController.back();
  }

}
