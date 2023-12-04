import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bookhome } from '../../../interfaces/bookhome';
import { Router } from '@angular/router';
import { bookimg } from '../../../interfaces/bookimg';
import { Author } from '../../../interfaces/Author';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  images =
  [
  'assets/banner/vuidentruong.jpg',
  'assets/banner/childrenbook.jpg',
  'assets/banner/manga.jpg',
  ]
  constructor(private http: HttpClient,private router: Router) {}
  dt: bookhome[] = [];
  img: bookimg[]=[];
  author:Author |null=null;
  ngOnInit() {
    // Make a GET request to fetch book data
    this.http.get<bookhome[]>('https://localhost:7009/api/Books').subscribe(
      (response) => {
        this.dt = response;

      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu ', error);
      }
    );
    this.http.get<bookimg[]>(`https://localhost:7009/api/Bookimgs?`).subscribe(
      (response) => {
        // Store the image in the img object with the book ID as the key
        if (response) {
          this.img = response;
        }
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu', error);
      }
);

}
  getBookImage(bookId: string): string {
    const matchingImage = this.img.find((img) => img.idBook === bookId);
    return matchingImage ? matchingImage.image0 : ''; // Return the image URL if found, otherwise an empty string
  }
  navigateToProduct(productId: string) {
    // Loại bỏ dấu cách và khoảng trắng khỏi productId
    const sanitizedProductId = productId.replace(/\s+/g, ''); // Loại bỏ dấu cách và khoảng trắng
    // Truyền productId đã được loại bỏ dấu cách vào route "product"
    this.router.navigate(['product', sanitizedProductId]);
  }
  percent1(price: number, per: number): number {
    return price *(1- per) ;}
}
