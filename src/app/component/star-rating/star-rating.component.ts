import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;  

  itemsToRepeat = new Array(5);

  handleUpdateRating(newRate: number) {
      this.rating = newRate;
  }
}
