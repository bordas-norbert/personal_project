import { Component } from '@angular/core';
import { InvalidInputFilters } from 'src/app/models/Classes/InvalidInputFilters';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  errorMessage: string = ""
  category: Category = {
    categoryId: 0,
    categoryName: ""
  }

  constructor(private categoryService: CategoriesService) {}

  addCategory() {
    this.errorMessage = ''
    this.categoryService.addCategory(this.category).subscribe({
      next: (response) => console.log(),
      error: (err) => {
        if(err.status === 409)
          this.errorMessage = "Category already existing"
      }
    })
  }

  invalidCategoryName(name: string) {
    if(name.length === 0 || name == null) return true;

    for(let ch of name) {
      if(InvalidInputFilters.numbers.includes(ch) || InvalidInputFilters.specialCharacters.includes(ch))
        return true;
    }    
    return false;
  }
}
