import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-spinning-wheel',
  templateUrl: './spinning-wheel.component.html',
  styleUrls: ['./spinning-wheel.component.css']
})
export class SpinningWheelComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('spinButton', { static: true }) spinButton!: ElementRef;
  segments = [5, 10, 6, 4, 7, 15];
  number: number = Math.ceil(Math.random() * 10000);
  currentRotation: number = 0;
  constructor(private couponService: CouponsService, private router: Router) {}
  ngAfterViewInit() {
    this.spinButton.nativeElement.onclick = this.spin.bind(this);
  }

  spin() {
    let coupon: Coupon = {
      couponId: 0,
      clientId: Number(localStorage.getItem('clientId')),
      percentageDiscount: 0,
      couponCode: ""
    }
    this.number = Math.ceil(Math.random() * 10000);
    const totalRotation = this.currentRotation + this.number;
    this.container.nativeElement.style.transform = `rotate(${totalRotation}deg)`;
    this.currentRotation = totalRotation;

    setTimeout(() => {
      const segmentAngle = 360 / this.segments.length;
      const normalizedRotation = totalRotation % 360;
      const landingIndex = Math.floor((360 - normalizedRotation + (segmentAngle / 2)) % 360 / segmentAngle);
      const landingSegment = this.segments[landingIndex];
      coupon.percentageDiscount = landingSegment
      coupon.couponCode = this.generateCode()
      this.couponService.addCoupon(coupon).subscribe({
        next: (result) => {
          console.log(result)
        }
      }),
      alert(`Your coupon code for ${coupon.percentageDiscount}% is ${coupon.couponCode}`)
    this.router.navigate(['/'])
    }, 3000); 
    
  }
  generateCode(): string {
    let toReturn: string = ""
    const characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    for(let i:number = 0; i < 15; i++) {
      toReturn += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return toReturn
  }
}
