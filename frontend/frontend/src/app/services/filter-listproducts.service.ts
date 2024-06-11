import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterListproductsService {

  private categorySubject = new Subject<string>();

  // Observable for the category
  category$ = this.categorySubject.asObservable();

  // Method to emit a new category
  setCategory(category: string) {
    this.categorySubject.next(category);
  }
}
