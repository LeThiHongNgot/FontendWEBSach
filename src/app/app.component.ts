import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from 'src/interfaces/bookimg';
import { Author } from 'src/interfaces/Author';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  pro: any = {}
  title = 'WebQuanLyCuaHangSach';
  constructor(private http: HttpClient) {}
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
      });
    this.http.get<Category[]>(`https://localhost:7009/api/Categories?`).subscribe(
      {
        next: response => {
          if(response) {
            this.categories = response;
          }
        },
        error: error => {
          console.error('Lỗi xảy ra khi lấy dữ liệu thể loại', error);
        }
      });
  }

 


}
