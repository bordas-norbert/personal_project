import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseApiUrl: string = "https://localhost:7277";
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseApiUrl + "/api/categories")
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseApiUrl + '/api/categories', category)
  }

  getCategoryId(name: string) {
    const params = new HttpParams().set('name', name);
    return this.http.get(`${this.baseApiUrl}/api/categories/${name}`, {params})
  }
}
