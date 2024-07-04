import { CartService } from './../../../services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subscription } from 'rxjs';
import { FilterListproductsService } from 'src/app/services/filter-listproducts.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {
  public productsArray: Array<[Product, number]> = [];
  productsPictureIndexes: number[] = []
  categoryFilter: string = ""
  private categoryFilterSubscription: Subscription = new Subscription
  constructor(private cartService: CartService, private productService: ProductsService, 
   private categoriesService: CategoriesService, private sharedService: FilterListproductsService){}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        let counter = 0;
        products.forEach(product => {
          this.productsArray.push([product, counter])
          counter++
        })
      }
    })
      
    this.categoryFilterSubscription = this.sharedService.category$.subscribe(category => {
      this.categoryFilter = category;
      this.categoriesService.getCategoryId(this.categoryFilter).subscribe(
        (response) => {
          this.productsArray = this.productsArray.filter(([product, _]) => product.categoryId === response)
        }
      );
    })
  }
  ngOnDestroy():void {
    if (this.categoryFilterSubscription) {
      this.categoryFilterSubscription.unsubscribe();
    }
  }
  public addToCart(product: Product, quantity: string, pictureId: number) {
    
    this.cartService.addProductToCart(product, Number(quantity), this.getPicNr(product));
  }

  getPicNr(product: Product) {
    const tuple = this.productsArray.find(([p, _]) => product.name === p.name && product.categoryId === p.categoryId) as [Product, number]
    return tuple[1];
  }

}
