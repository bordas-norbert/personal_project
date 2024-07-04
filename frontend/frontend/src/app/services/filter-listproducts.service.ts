import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterListproductsService {

  private categorySubject = new Subject<string>();

  category$ = this.categorySubject.asObservable();
  
  setCategory(category: string) {
    this.categorySubject.next(category);
  }
}
