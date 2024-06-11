import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'src/app/models/Interfaces/Dictionary';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.css']
})
export class ListCartComponent {
  cartProducts: Array<[Product, number]> = []
  public pictureIndexes: number[] = []
  public itemsCount: number = 0;
  totalCartValue: number = 0
  disabledButton: boolean = true;
  constructor(private cartService: CartService, private router: Router) {

  }
  ngOnInit() {
    this.cartProducts = this.cartService.getItemsFromCart();
    this.pictureIndexes = this.cartService.getPicIndexes();
    this.recalculateTotalPrice()
  }

  activateButton(): void {
    this.disabledButton = false;
  }

  removeProductFromCart(product: Product, picId: number) {
    this.cartService.removeProductFromCart(product, picId);
    this.recalculateTotalPrice()
    this.refreshComponent()
  }

  updateQuantityFor(product: Product, newQuantity: string) {
    this.cartService.updateQuantityFor(product,Number(newQuantity));
    this.recalculateTotalPrice()
    this.refreshComponent();
  }
  navigateToPlaceOrder() {
    this.router.navigate(['place-order'])
  }
  refreshComponent(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/list-cart']);
    });
  }
  recalculateTotalPrice() {
    this.cartProducts.forEach(product => {
      this.totalCartValue += product[0].unitPrice * product[1];
    })
  }

}
