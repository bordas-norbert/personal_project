import cli from '@angular/cli';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressesService } from 'src/app/services/addresses.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent {
  clientAddress: Address = {
    client_id: Number(localStorage.getItem('clientId')),
    address_id: 0,
    city: "",
    street:  "",
    number: 0
  }
  isLoggedIn: boolean = localStorage.getItem('isLoggedIn') === 'true';
  showComponent: boolean = false;
  constructor(private addressService: AddressesService, private router: Router) {}
  changeShowComponent(): void {
    this.showComponent = !this.showComponent;
  }
  addAddress()
  {
    this.addressService.addAddress(this.clientAddress).subscribe({
      next: () =>{
        this.refreshComponent();
      }
    })
  }
  refreshComponent(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addresses']);
    });
  }

}
