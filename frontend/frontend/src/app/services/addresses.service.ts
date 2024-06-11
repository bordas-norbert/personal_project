import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  baseApiUrl: string = "https://localhost:7277";
  constructor( private http: HttpClient) { }
  
  addAddress(clientAddress: Address): Observable<Address> {
    return this.http.post<Address>(this.baseApiUrl + '/api/addresses', clientAddress);
  }

  getAllAddresses(clientId: string): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseApiUrl + '/api/addresses/' + clientId);
  }
  updateAddress(newAddress: Address) :Observable<Address> {
    return this.http.put<Address>(this.baseApiUrl + '/api/addresses', newAddress)
  }
  deleteAddress(addressId: number): Observable<Address> {
    return this.http.delete<Address>(this.baseApiUrl + '/api/addresses/' + addressId)
  }
}
