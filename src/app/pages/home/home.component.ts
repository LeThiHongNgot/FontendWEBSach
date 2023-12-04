import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bookhome } from '../../../interfaces/bookhome';
import { Router } from '@angular/router';
import { bookimg } from '../../../interfaces/bookimg';
import { Author } from '../../../interfaces/Author';
import { BooksService } from 'src/services/Books/books.service';
import { BookImgsService } from 'src/services/BookImgs/bookimgs.service';
import { AuthorsService } from 'src/services/Authors/authors.service';
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
  constructor(private http: HttpClient,private router: Router,private bookImgs: BookImgsService, private books: BooksService,
    private authors:AuthorsService) {}
  Books: bookhome[] = [];
  img: bookimg[]=[];
  author:Author |null=null;
  ngOnInit() {

    this.books.Books().subscribe({
      next:(res)=>{
        this.Books=res
      },
      error:(err)=>{
        console.error('Lỗi lấy dữ liệu ',err);
      },
    });
    this.bookImgs.BookImg().subscribe({
      next: (res) => {
        this.img=res
      },
      error: (err) => {
        alert('Vui lòng nhập đúng thông tin');
      },
    });

}
  getBookImage(bookId: string): string {
    const matchingImage = this.img.find((img) => img.bookId === bookId);
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
