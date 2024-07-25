import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
  standalone: true,
})
export class SearchComponent  {
  pokemon: string = "";

  constructor(private router: Router) { }

  search() {
    this.router.navigate(['/pokemon', this.pokemon]);
  }

}
