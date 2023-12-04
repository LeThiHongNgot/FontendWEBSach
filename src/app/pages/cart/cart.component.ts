import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  quantity: number = 1;  

  decrement(): void {
      if (this.quantity > 1) {  
          this.quantity--;
      }
  }

  increment(): void {
      this.quantity++;  
  }
}