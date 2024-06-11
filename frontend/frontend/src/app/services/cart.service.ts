import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products.model';
import { Dictionary } from '../models/Interfaces/Dictionary';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCount = new BehaviorSubject<number>(0);
  private shoppingCart = new Array<[Product, number]>();
  pictureIndexes: number[] = []

  addProductToCart(product: Product, quantity: number, picIndexOf: number) {

    const productIndex = this.shoppingCart.findIndex(
      ([cartProduct]) => cartProduct.name === product.name
    )
    if(productIndex !== -1)
    {
      this.shoppingCart[productIndex][1] += quantity;
    }
    else
    {
      this.shoppingCart.push([product, quantity])
      this.pictureIndexes.push(picIndexOf);
    }
    this.cartCount.next(this.cartCount.value + quantity);
  }
  get getItemsCount() {
    return this.cartCount.asObservable();
  }
  getItemsFromCart() {
    return this.shoppingCart;
  }
  getPicIndexes() {
    return this.pictureIndexes;
  }
  removeProductFromCart(toRemoveProduct: Product, pictureId: number) {
    const productIndex = this.shoppingCart.findIndex(
      ([cartProduct]) => cartProduct.name === toRemoveProduct.name)
    
    let newNr = this.cartCount.value - this.shoppingCart[productIndex][1];
    this.cartCount.next(newNr)

    this.shoppingCart = this.shoppingCart.filter(([product,_]) => product.name !== toRemoveProduct.name);
    this.pictureIndexes = this.pictureIndexes.filter(nr => nr !== pictureId)
  }

  updateQuantityFor(product: Product, newQuantity: number) {
    const productIndex = this.shoppingCart.findIndex(
      ([cartProduct]) => cartProduct.name === product.name)

    if(newQuantity < this.shoppingCart[productIndex][1]) {
      let newNr = this.cartCount.value - (this.shoppingCart[productIndex][1] - newQuantity);
      this.cartCount.next(newNr)
    }
    else
    {
      let newNr = this.cartCount.value + (Math.abs(this.shoppingCart[productIndex][1] - newQuantity));
      this.cartCount.next(newNr)
    }
    this.shoppingCart[productIndex][1] = newQuantity;

  }

  emptyCart() {
    this.cartCount.next(0)
    this.shoppingCart.length = 0
    this.pictureIndexes.length = 0
  }
}
