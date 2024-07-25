import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class PokemonPage implements OnInit {
  id: number = 0;

  constructor(private route: ActivatedRoute, private navController: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  goBack() {
    this.navController.back();
  }

}
