import cli from '@angular/cli';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvalidInputFilters } from 'src/app/models/Classes/InvalidInputFilters';
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
    if(this.invalidInputs()){
      alert('invalid inputs')
      return
    }
    this.addressService.addAddress(this.clientAddress).subscribe({
      next: () =>{
        this.refreshComponent();
      }
    })
  }
  invalidInputs():boolean{
    if(this.invalidCityName(this.clientAddress.city) ||
       this.invalidStreetName(this.clientAddress.street) ||
       this.invalidNumber(this.clientAddress.number.toString()))
        return true;
   
   return false
  }
  refreshComponent(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/addresses']);
    });
  }

  invalidCityName(city: string):boolean {
    if (city.length === 0) return true;
    
    for(let ch of city) {
      if(InvalidInputFilters.numbers.includes(ch) || 
         InvalidInputFilters.specialCharacters.includes(ch))
        return true;
        }

    return false;
  }

  invalidStreetName(street: string):boolean {
    return this.invalidCityName(street)
  }

  invalidNumber(nr: string):boolean {
    if(String.length === 0) return true;

    for(let ch of nr)
      if(!InvalidInputFilters.numbers.includes(ch))
        return true;
    return false;
  }

}
