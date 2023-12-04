import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from 'src/interfaces/bookimg';
import { Router } from '@angular/router';
import { Author } from 'src/interfaces/Author';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router) {}
  dt: bookhome[] = [];
  img: bookimg[]=[];
  author:Author[]  = [];
  ngOnInit() {
    // Make a GET request to fetch book data
    this.http.get<bookhome[]>('https://localhost:7009/api/Books').subscribe(
      (response) => {
        this.dt = response;


      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sách', error);
      }
    );
    this.http.get<bookimg[]>(`https://localhost:7009/api/Bookimgs?bookId`).subscribe(
      (response) => {
        // Store the image in the img object with the book ID as the key
        if (response.length > 0) {
          this.img = response;
        }
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu hình ảnh', error);
      }
);
this.http.get<Author[]>(`https://localhost:7009/api/Authors`).subscribe(
      (response) => {
        this.author = response;
      },
      (error) => {
        console.error('Error fetching product data', error);
      }
    );}

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
  getautor(authorId: string): string {
    const Authors = this.author.find((author) => author.id === authorId);
    return Authors ? Authors.name : '';
  }
}
