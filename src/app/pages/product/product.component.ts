import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from '../../../interfaces/bookimg';
import { Author } from '../../../interfaces/Author';
import { Category } from '../../../interfaces/Category';
import { BookDetail } from '../../../interfaces/bookdetail';
import { Supplier } from '../../../interfaces/Supplier';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BookImgsService } from 'src/services/BookImgs/bookimgs.service';
import { BooksService } from 'src/services/Books/books.service';
import { AuthorsService} from 'src/services/Authors/authors.service';
import { CategoriesService } from 'src/services/Categories/categories.service';
import { BookDetailsService } from 'src/services/BookDetails/bookdetails.service';
import { SupliersService } from 'src/services/Supliers/supliers.service';
@Component({ selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor( private route: ActivatedRoute,
    private router: Router,private bookImgs: BookImgsService, private books: BooksService,
    private authors:AuthorsService,private categories:CategoriesService,private bookdetails:BookDetailsService,
    private suplier:SupliersService) {}
  product: bookhome | null = null;
  products: bookhome [] = [];
  img: bookimg | null = null;
  author:Author[]  = [];
  Category:Category[]=[];
  Suplier:Supplier[]=[];
  bookdetail:BookDetail | null = null;
  book: any[] = [];
  imgbook:bookimg[]=[];
 // ...
 ngOnInit(): void {
const productId= this.route.snapshot.paramMap.get('id')||'';
  if (productId) {
    this.books.BooksId(productId).subscribe({
      next:(res)=>
      {
        this.product = res
      },
      error:(err)=>
      {
        console.error('lỗi', err);
      }
    })
    this.bookImgs.BookImgId(productId)
    .subscribe({
      next: (res) => {
        this.img = res
      },
      error: (err) => {
        console.error('Lỗi từ API:', err);
      },
    });
    // Lấy sách cùng loại
    this.books.Books().subscribe({
      next:(res)=>{
        this.products=res
      },
      error:(err)=>{
        console.error('Lỗi lấy dữ liệu ',err);
      },
    });
    this.authors.Authors().subscribe({
      next:(res)=>{
        this.author=res
      },
      error:(err)=>{
        console.error('Lỗi lấy dữ liệu ',err);
      },
    });
    this.categories.Categories().subscribe({
      next:(res)=>{
        this.Category=res
      },
      error:(err)=>{
        console.error('Lỗi lấy dữ liệu tác giả',err);
      },
    });
  this.bookdetails.BookDetailId(productId).subscribe({
    next:(res)=>{
      this.bookdetail=res
    },
    error:(err)=>{
      console.error('Lỗi lấy dữ liệu ',err);
    },
  });
    this.suplier.Suppliers().subscribe({
      next:(res)=>{
        this.Suplier= res
      },
      error:(err)=>{
        console.error('Lỗi lấy dữ liệu tác giả',err);
      },
    })
  this.bookImgs.BookImg().subscribe({
  next: (res) => {
    this.imgbook=res
  },
  error: (err) => {
    alert('Vui lòng nhập đúng thông tin');
  },
});

this.bookdetails.BookDetail().subscribe({
  next: (res: any[]) => {
    this.book = res.filter(product => product.categoryId === this.bookdetail?.categoryId);
  },
  error: (err) => {
    console.error('Lỗi lấy dữ liệu tác giả', err);
  },
});

  }

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
    const matchingImage = this.imgbook.find((imgbook) => imgbook.bookId === bookId);
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
