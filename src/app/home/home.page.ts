import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { SearchComponent } from '../search/search.component';
import { addIcons } from 'ionicons';
import { star, trophy } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink, SearchComponent]
})
export class HomePage implements OnInit {
  pokemonsTemp: any[] = [];
  pokemons: any[] = [];

  constructor(private router: Router, private apiSrv: ApiService) { 
    addIcons({ star, trophy })
  }

  ngOnInit() {
    this.apiSrv.getPokemons().subscribe({
      next: (response: any) => {
        // console.log(response);
        if (response.results) {
          response.results.forEach((pokemon: any) => {
            this.pokemonsTemp.push({
              id: pokemon.url.split('pokemon/')[1].split('/')[0],
              name: pokemon.name,
            });

            this.getPokemonSprite(pokemon?.url);
          })
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        
      }
    })
  }

  getPokemonSprite(url: string) {
    this.apiSrv.getPokemon(url).subscribe({
      next: (response: any) => {
        this.pokemons.push({
          id: response.id,
          name: response.name,
          sprite: response.sprites.front_default,
        })
      }, 
      error: (err) => {
        console.log(err);
      }
    });

  }

  getPokemon(id: number) {
    this.router.navigate(['/pokemon', id]);
  }

  myFavourites() {
    this.router.navigate(['/favourites']);
  }

  myTeam() {
    this.router.navigate(['/team']);
  }

}
