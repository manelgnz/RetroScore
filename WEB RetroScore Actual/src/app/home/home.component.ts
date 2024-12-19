import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Title } from '@angular/platform-browser';
import { Jersey } from '../models/Jersey';
import { JerseyComponent } from "../jersey/jersey.component";
import { SliderComponent } from "../slider/slider.component";
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css'],
  imports: [JerseyComponent, SliderComponent, CommonModule]
})
export class HomeComponent implements OnInit {
  jerseys: Jersey[] = [];
  apiService = inject(ApiService);
  titleService = inject(Title);

  constructor() { }

  ngOnInit(): void {
    this.titleService.setTitle('RetroScore | Home');
    this.loadJerseys();
  }

  loadJerseys(): void {
    const jerseyIds = [
      "674f57efad2596822f3b1833",
      "674f57efad2596822f3b1843",
      "674f57eead2596822f3b17f5",
      "674f57efad2596822f3b17f7"
    ];

    const jerseyObservables = jerseyIds.map(id => this.apiService.getJerseyById(id));
    forkJoin(jerseyObservables).subscribe((data: Jersey[]) => {
      this.jerseys = data;
    });
  }

  addToCart(jersey: Jersey): void {
    const user = this.apiService.getLoggedInUser();

    // Verifica si el usuario existe
    if (user) {
      const cartItem = {
        userId: user.userId,
        jerseyId: jersey.id,
        quantity: 1
      };
      this.apiService.addToCart(cartItem).subscribe((response: any) => {
        console.log('Jersey added to cart', response);
      });
    } else {
      console.error('No user is logged in. Cannot add to cart.');
      // Aquí podrías redirigir al usuario a la página de inicio de sesión o mostrar un mensaje
    }
  }
}
