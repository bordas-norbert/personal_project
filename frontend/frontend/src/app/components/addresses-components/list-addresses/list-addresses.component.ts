import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { AddressesService } from 'src/app/services/addresses.service';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent {
  private clientId: string;
  clientAddresses: Address[] =[];
  editable: boolean = false;
  editingAddress: Address | null = null;

  constructor(private addressService: AddressesService, private router: Router) {
    this.clientId = localStorage.getItem('clientId') as string;
    this.getAllAddresses();
  }

  toggleEditMode(address: Address | null) {
    if(address == null)
      this.updateAddress();
    this.editingAddress = address;
  }

  updateAddress(){
    console.log(this.editingAddress)
    this.addressService.updateAddress(this.editingAddress as Address).subscribe({
      next: (adr) => {
        this.router.navigate(['addresses'])
      }
    })
  }

  deleteAddress() {
    this.addressService.deleteAddress(this.editingAddress?.address_id as number).subscribe({
      next: (response) => {
       this.refreshComponent();
      },
      error: (msg) => {
        this.router.navigate(['/addresses'])
      }
    })
  }

  getAllAddresses(): void{
    this.addressService.getAllAddresses(this.clientId).subscribe({
      next: (addresses) => {
        this.clientAddresses = addresses;
      }
    })
  }
  refreshComponent(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addresses']);
    });
  }
}
