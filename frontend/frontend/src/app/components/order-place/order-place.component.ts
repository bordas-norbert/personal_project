import { CouponsService } from 'src/app/services/coupons.service';
import { Order } from './../../models/order.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRequest } from 'src/app/models/Classes/OrderRequest';
import { Address } from 'src/app/models/address.model';
import { Product } from 'src/app/models/products.model';
import { AddressesService } from 'src/app/services/addresses.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css']
})
export class OrderPlaceComponent {
  cartProducts: Array<[Product, number]> = []
  clientAddresses: Address[] = []
  totalCartValue: number = 0;
  orderRequest: any
  chosenAddress: string = "No shipping address is chosen"
  chosenAddressId: number = 0;
  orderComment:string = ""
  addressWasChosen: boolean = false;
  buttonWasTouched: boolean = false;
  constructor(private router: Router, private cartService: CartService, private addressService: AddressesService,
              private ordersService: OrdersService, private couponsService: CouponsService) {  }
  
  ngOnInit() {
    this.cartProducts = this.cartService.getItemsFromCart();
    this.cartProducts.forEach(product => {
      this.totalCartValue += product[0].unitPrice * product[1];
    })
    this.addressService.getAllAddresses(localStorage.getItem('clientId') as string).subscribe({
      next: (result) => {
        this.clientAddresses = result;
      }
    })
    
  }
  validateCoupon(couponCode: string) {
    let params: string[] = []
    params.push(localStorage.getItem('clientId') as string)
    params.push(couponCode)
    this.couponsService.validateCoupon(params).subscribe({
      next: (result) => {
        this.totalCartValue = this.totalCartValue - (this.totalCartValue / Number(result))
      },
      error: () => {
        alert('Coupon already used or not valid')
      }
    })
  }

  chooseAddress(adr: Address) {
    this.chosenAddress = adr.city + " " + adr.street + " " + adr.number;
    this.chosenAddressId = adr.address_id;
    this.addressWasChosen = true;
  }
  constructOrderRequest() {
    let order: Order = {
      orderId: 0,
      clientId: Number(localStorage.getItem('clientId')),
      addressId: this.chosenAddressId,
      comment: this.orderComment,
      order_date: new Date(),
      shipperId: 1
    }
    let products: Product[] = this.cartProducts.map(item => item[0])
    let quantities: number[] = this.cartProducts.map(item => item[1])
    this.orderRequest = {order, products, quantities}
  }
  
  placeOrder(comment:string) {
    this.buttonWasTouched = true;
    if(this.addressWasChosen === false) return;
    this.orderComment = comment
    this.constructOrderRequest();

    this.ordersService.AddOrder(this.orderRequest as OrderRequest).subscribe()
    this.cartService.emptyCart()
    if(this.totalCartValue > 250)
      this.router.navigate(['spinning-wheel'])
    else
      this.router.navigate(['/'])
  }

}
