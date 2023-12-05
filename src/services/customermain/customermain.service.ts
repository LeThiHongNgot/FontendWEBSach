import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CustomermainService {

  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }
   Customers() {
    return this.http.get<any[]>(`${this.baseUrl}Customers`)
  }
  CustomerId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Customers/${id}`)
  }

  createCustomer(customerData: any){
    return this.http.post(`${this.baseUrl}Customers`, customerData)
  }
  updateCustomer(id: string, updatedData: any){
    return this.http.put(`${this.baseUrl}Customers/${id}`, updatedData)
  }
  deleteCustomer(id: string) {
    return this.http.delete(`${this.baseUrl}Customers/${id}`)
  }
}
