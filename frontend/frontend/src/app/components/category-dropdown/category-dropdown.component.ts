import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterListproductsService } from 'src/app/services/filter-listproducts.service';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.css']
})
export class CategoryDropdownComponent {
  @Input() categoryNames:string[] = []

  constructor(private sharedService: FilterListproductsService) {}

  sendFilter(category: string) {
    this.sharedService.setCategory(category)
  }
}
