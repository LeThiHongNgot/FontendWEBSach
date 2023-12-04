import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from 'src/interfaces/bookimg';
import { Author } from 'src/interfaces/Author';
import { Category } from 'src/interfaces/Category';
import { Router } from '@angular/router';
import { BookDetail } from 'src/interfaces/bookdetail';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {}
  dt: bookhome[] = [];
  img: bookimg[]=[];
  bookdetail: BookDetail []=[];
  author:Author[]  = [];
  category: Category | null=null;
  backupData: bookhome []=[];
  uniqueAuthorIds: string[] = [];
  
  ngOnInit(): void {
    const categoryId= this.route.snapshot.paramMap.get('id')||'';
    // Make a GET request to fetch book data
    if(categoryId) {
      this.http.get<Category>(`https://localhost:7009/api/Categories/${categoryId}`).subscribe(
        {
          next: response => {
            this.category = response;
          },
          error: error => {
            console.error('Lỗi khi lấy dữ liệu thể loại', error);
          }
        }
      );
      this.http.get<bookhome[]>(`https://localhost:7009/api/Books/`).subscribe(
        {
          next: bookResponse => {
            this.dt = bookResponse;
          },
          error: error => {
            console.error('Lỗi khi lấy dữ liệu sách', error);
          }
        }
      );
      this.http.get<BookDetail[]>(`https://localhost:7009/api/Bookdetails/`).subscribe(
        {
          next: bookDetailResponse => {
            this.bookdetail = bookDetailResponse.filter(bookDetail => bookDetail.categoryId === categoryId);
            const bookIds:string[] = this.bookdetail.map(bookDetail => bookDetail.bookId);
            this.dt = this.dt.filter(book => bookIds.includes(book.id));
            this.backupData = this.dt;
            this.extractUniqueAuthorIds();
          }
        }
      );
      this.http.get<bookimg[]>(`https://localhost:7009/api/Bookimgs?bookId`).subscribe(
        {
        next: response => {
          if (response) {
            this.img = response;
          }
          },
          error: error => {
            console.error('Lỗi khi lấy dữ liệu hình ảnh', error);
          }
        }
      );
      this.http.get<Author[]>(`https://localhost:7009/api/Authors`).subscribe(
        {
          next: response => {
            this.author = response;
          },
          error: error => {
            console.error('Lỗi khi lấy dữ liệu tác giả', error);
          }
        }
      );
    }
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
  getautor(authorId: string): string {
    const Authors = this.author.find((author) => author.id === authorId);
    return Authors ? Authors.name : '';
  }
  sortProducts(sortOption: string) {
    if(sortOption === '1')
      this.dt.sort((a,b) => a.unitPrice-b.unitPrice);
    else if(sortOption === '2')
      this.dt.sort((a,b) => b.unitPrice-a.unitPrice);
  }
  getPriceRangeValues(priceRange: string): [number, number] {
    switch (priceRange) {
      case '1':
        return [0, 100000]; // Range 0 - 100,000
      case '2':
        return [100000, 200000]; // Range 100,000 - 200,000
      case '3':
        return [200000, 300000]; // Range 200,000 - 300,000
      default:
        return [0, 0]; // Default range, can be modified based on requirement
    }
  }
  filterProductsByPrice(priceRange: string | "") {
    if(priceRange === "")
    {
      this.dt = this.backupData;
      return;
    }
    else
    {
      const [minPrice, maxPrice] = this.getPriceRangeValues(priceRange);

      this.dt = this.backupData.filter(product => {
        return product.unitPrice >= minPrice && product.unitPrice <= maxPrice;
      });
    }
  }
  extractUniqueAuthorIds() {
    const authorIds = this.dt.map(product => product.authorId);
    this.uniqueAuthorIds = Array.from(new Set(authorIds));
  }
  filterProductsByAuthor(authorId: string | "") {
      if (authorId !== '') {
          this.dt = this.backupData.filter(product => product.authorId === authorId);
      } else {
          this.dt = this.backupData;
      }
  }
}
