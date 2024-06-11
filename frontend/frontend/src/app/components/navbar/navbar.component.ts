import { Trie } from './../../models/Classes/Trie';
import { CartService } from './../../services/cart.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  imageUrl: string = "usericon.jpg";

  private categoryArraySubject = new BehaviorSubject<Category[]>([])
  categoryNames: string[] = []
  cartCount: number = 0;
  urlEndsWithProduct: boolean = false;
  private trie: Trie = new Trie();
  categoryNamesMatchingInput: string[] = []
  categoryFilter: string= ""
  constructor(private cartService: CartService,private router: Router, private service: ClientsService, private categoryService: CategoriesService) {}

  isLoggedIn() {
    return this.service.isLoggedIn();
  }
  isAdminLoggedIn():boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
  
  ngOnInit() {
    this.checkUrl();
    this.cartService.getItemsCount.subscribe(count => {
      this.cartCount = count;
    });
    this.router.events.subscribe(() => {
      this.checkUrl();
    });

    this.categoryArraySubject.subscribe(categories => {
      this.categoryNames = categories.map(category => category.categoryName);
      for(let names of this.categoryNames)
        this.trie.insert(names)
    });
    this.categoryService.getAllCategories().subscribe({
      next: (result) => this.categoryArraySubject.next(result)
    })
  }
  
  getClosestCategoryNames(input: string)
  {
    this.categoryNamesMatchingInput = this.trie.findAllWords(input)
    console.log(this.categoryNamesMatchingInput)
  }
 
  checkUrl() {
    this.urlEndsWithProduct = this.router.url.endsWith('/products') || this.router.url.endsWith('/#') ||
    this.router.url.endsWith('/');
  }
  
}
