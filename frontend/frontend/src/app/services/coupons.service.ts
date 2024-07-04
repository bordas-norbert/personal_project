import { Coupon } from './../models/coupon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  
  baseApiUrl: string = "https://localhost:7277";
  constructor( private http: HttpClient) { }

  addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(this.baseApiUrl + '/api/coupons', coupon)
  }
  validateCoupon(params: string[]) {
    return this.http.post(this.baseApiUrl + '/api/coupons/validate', params)
  }
}
