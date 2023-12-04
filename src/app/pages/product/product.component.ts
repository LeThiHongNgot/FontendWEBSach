import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from '../../../interfaces/bookimg';
import { Author } from '../../../interfaces/Author';
import { Category } from '../../../interfaces/Category';
import { BookDetail } from '../../../interfaces/bookdetail';
import { Supplier } from '../../../interfaces/Supplier';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {}

  product: bookhome | null = null;
  products: bookhome [] = [];
  img: bookimg | null = null;
  author:Author[]  = [];
  Category:Category[]=[];
  Suplier:Supplier[]=[];
  bookdetail:BookDetail | null = null;
  book:BookDetail[]=[];
  imgbook:bookimg[]=[];
 // ...
 ngOnInit(): void {
const productId= this.route.snapshot.paramMap.get('id')||'';

  if (productId) {
    this.http.get<bookhome>(`https://localhost:7009/api/Books/${productId}`).subscribe(
      (response) => {
        this.product = response;
      },
      (error) => {
        console.error('lỗi', error);
      }
    )
    console.log(productId)
    this.http.get<bookimg>(`https://localhost:7009/api/Bookimgs/${productId}`).subscribe(
      (response) => {
        this.img = response;
      },
      (error) => {
        console.error('Lõi dữ liệu', error);
      }
    );
    this.http.get<Author[]>(`https://localhost:7009/api/Authors`).subscribe(
      (response) => {
        this.author = response;
      },
      (error) => {
        console.error('Error fetching product data', error);
      }
    );
    this.http.get<Category[]>(`https://localhost:7009/api/Categories/`).subscribe(
      (response) => {
        this.Category = response;
      },
      (error) => {
        console.error('Lõi dữ liệu', error);
      }
    );
    this.http.get<BookDetail>(`https://localhost:7009/api/Bookdetails/${productId}`).subscribe(
      (response) => {
        this.bookdetail = response;
      },
      (error) => {
        console.error('Lõi dữ liệu', error);
      }
    );
    this.http.get<Supplier[]>(`https://localhost:7009/api/Suppliers`).subscribe(
      (response) => {
        this.Suplier= response;
      },
      (error) => {
        console.error('Lõi dữ liệu', error);
      }
    );
   // Tải tất cả các sản phẩm từ dịch vụ web

    this.http.get<bookimg[]>(`https://localhost:7009/api/Bookimgs`).subscribe(
      (response) => {
        this.imgbook= response;
      },
      (error) => {
        console.error('Lõi dữ liệu', error);
      }
    );
    this.http.get<BookDetail[]>(`https://localhost:7009/api/Bookdetails/`).subscribe(
      (productsResponse) => {
       this.book = productsResponse.filter(product => product.categoryId === this.bookdetail?.categoryId)

      },
      (error) => {
        console.error('Lỗi dữ liệu', error);
      }
    );
  }
  this.http.get<bookhome[]>(`https://localhost:7009/api/Books`).subscribe(
    (response) => {
      this.products = response;
    },
    (error) => {
      console.error('Lỗi khi tải sản phẩm', error);
    }
  );
  }

  getProductInfo(productId: string): Observable<{ title: string, unitPrice: number,precent: number} | undefined> {
    return new Observable((observer) => {
      const product = this.products.find(product => product.id === productId);
      if (product) {
        observer.next({ title: product.title, unitPrice: product.unitPrice,precent:product.pricePercent});
      } else {
        observer.next(undefined);
      }
      observer.complete();
    });
  }

  getBookImage(bookId: string): string {
    const matchingImage = this.imgbook.find((imgbook) => imgbook.idBook === bookId);
    return matchingImage ? matchingImage.image0 : '';
  }
  getautor(authorId: string): string {
    const Authors = this.author.find((author) => author.id === authorId);
    return Authors ? Authors.name : '';
  }
  getcategory(categoryId: string): string {
    const Category = this. Category.find(( Category) =>  Category.id === categoryId);
    return  Category ?  Category.name : '';
  }
  getsupplier(suplierId: string): string {
    const Suplier = this. Suplier.find(( Suplier) =>  Suplier.id === suplierId);
    return  Suplier ?  Suplier.name : '';
  }
  percent1(price: number, per: number): number {
    return price *(1- per) ;}
  percent2(per:number)
  {
      return '-'+per*100+'%';
  }
  navigateToProduct(productId: string) {
    // Loại bỏ dấu cách và khoảng trắng khỏi productId
    const sanitizedProductId = productId.replace(/\s+/g, ''); // Loại bỏ dấu cách và khoảng trắng
    // Truyền productId đã được loại bỏ dấu cách vào route "product"
    this.router.navigate(['product', sanitizedProductId]).then(() => {

      location.reload();
    });
  }

}
