import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }
  Books() {
    return this.http.get<any>(`${this.baseUrl}Books`)
  }
  BooksId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Books/${id}`);
  }
  // Thêm mới sách
  addBook(book: any) {
    return this.http.post<any>(`${this.baseUrl}Bookdetails`, book);
  }

  // Xóa sách theo id
  deleteBookById(id: string){
    return this.http.delete<any>(`${this.baseUrl}Bookdetails/${id}`);
  }

  // Cập nhật thông tin sách
  updateBook(book: any) {
    return this.http.put<any>(`${this.baseUrl}Bookdetails/${book.id}`, book);
  }
}
