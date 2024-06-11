import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../models/Classes/OrderRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseApiUrl: string = "https://localhost:7277";
  constructor( private http: HttpClient) { }

  AddOrder(orderRequest: OrderRequest): Observable<OrderRequest> {
    return this.http.post<OrderRequest>(this.baseApiUrl + '/api/orders', orderRequest)
  }
}
