import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  public currentProduct: Product = {
    categoryId: 0,
    productId: 0,
    name: '',
    unitPrice: 0.0,
    quantityInStock: 0
  }
  constructor(private router: Router,private productServices: ProductsService) {}

  addProduct() {
    console.log(this.currentProduct)
    this.productServices.addProduct(this.currentProduct).subscribe({
      next: (response) => {
        this.refreshComponent();
      }
    })
  }
  refreshComponent(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/add-products']);
    });
  }

  isAdminLoggedIn(){
    return localStorage.getItem('userRole') === 'admin';
  }
}
