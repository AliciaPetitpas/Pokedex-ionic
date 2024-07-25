import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Pokemon } from '../models/pokemon';
import { Type } from '../models/type';

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

  constructor(private route: ActivatedRoute, private navController: NavController, private apiSrv: ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.apiSrv.getPokemonById(this.id).subscribe({
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

  goBack() {
    this.navController.back();
  }

}
