import { Category } from './../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseApiUrl: string = "https://localhost:7277";
  constructor( private http: HttpClient) { }
  
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApiUrl + '/api/products', product)
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/products')
  }
}
