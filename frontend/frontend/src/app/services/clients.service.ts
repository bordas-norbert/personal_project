
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseApiUrl: string = "https://localhost:7277";
  constructor( private http: HttpClient) { }
  

  getAllClients(): Observable<Client[]> {

    return this.http.get<Client[]>(this.baseApiUrl + '/api/clients')
    
  }

  addClient(addClientRequest: Client): Observable<Client> {
    return this.http.post<Client>(this.baseApiUrl + '/api/clients', addClientRequest);

  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(this.baseApiUrl + '/api/clients/' + id);
  }

  updateClient(id: string, updateClient: Client): Observable<Client> {
    return this.http.put<Client>(this.baseApiUrl + '/api/clients/' + id, updateClient);
  }

  deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(this.baseApiUrl + '/api/clients/' + id);
  }

  loginClient(credentials: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/clients/login', credentials)
    .pipe(
      tap( response => {
        localStorage.setItem('userRole', response.userRole);
        localStorage.setItem('username', response.username);
        localStorage.setItem('clientId', response.clientId);
        localStorage.setItem('isLoggedIn', 'true');
      })
    );
  }
  isLoggedIn() : boolean {
    return !!localStorage.getItem('userRole') && !!localStorage.getItem('username');
  }
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
