import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string = 'https://localhost:7009/api/Login/';
  constructor(private http: HttpClient, private router: Router) {
   }
  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}signup`, userObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}signin`,loginObj)
  }

}
