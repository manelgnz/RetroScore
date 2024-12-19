import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-jersey',
  templateUrl: './jersey.component.html',
  standalone: true,
  styleUrls: ['./jersey.component.css']
})
export class JerseyComponent implements OnInit {
  @Input() team!: string;
  @Input() price!: number;
  @Input() imageURL!: string;
  @Input() season!: string;
  @Input() colour!: string;
  @Input() jerseyId!: string;
  @Output() addToCartEvent = new EventEmitter<void>();

  apiService = inject(ApiService);

  ngOnInit(): void {
    console.log('Jersey component initialized with:', this.team, this.price, this.imageURL, this.season, this.colour, this.jerseyId);
  }

  addToCart(): void {
    this.addToCartEvent.emit(); 
    const user = this.apiService.getLoggedInUser();
    if (!user) {
      alert('Por favor, inicia sesión para añadir a la cesta');
      return;
    }
    const cartItem = {
      userId: user.userId, 
      jerseyId: this.jerseyId, 
      quantity: 1
    };
    this.apiService.addToCart(cartItem).subscribe({
      next: () => {
        alert(`${this.team} añadido a la cesta!`);
      },
      error: (err) => {
        console.error('Error al añadir a la cesta:', err);  
        alert('Hubo un error al añadir el jersey a la cesta. Inténtalo de nuevo.');
      }
    });
}
}
