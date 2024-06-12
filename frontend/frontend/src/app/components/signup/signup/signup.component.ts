import { ClientsService } from './../../../services/clients.service';
import { Component } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  addClientRequest: Client = {
    password: '',
    username: '',
    fullName: '',
    email: '',
    clientId: 0,
    phoneNumber: '',
    userRole: 'user'
  };
  invalidInput:boolean[] =  [false, false, false, false, false]
  specialCharacters = '[!@#$%^&*`-=+/\(),.?":{}|<>]'
  constructor(private clientService: ClientsService, private router: Router){ 
  }
  addClient() {
    if(this.notOkToAddClient())
      return;
    this.clientService.addClient(this.addClientRequest)
    .subscribe(
      {
        next: (client) => {
          this.router.navigate(['']); 
        }
      }
    )
  }
  notOkToAddClient():boolean {
    if(this.invalidUsername(this.addClientRequest.username) ||
       this.invalidPassword(this.addClientRequest.password) ||
       this.invalidEmail(this.addClientRequest.email) ||
       this.invalidPhoneNr(this.addClientRequest.phoneNumber) ||
       this.invalidFullName(this.addClientRequest.fullName)
  ) return true;
  return false;
  }
  invalidUsername(username: string):boolean {
    if(username === ' ' || username === '')
      return true;
    for(let ch of username)
      if(this.specialCharacters.includes(ch))
        return true;
    return false;
  }
  invalidPassword(psw: string) {
    return psw.length === 0
  }
  invalidEmail(email: string):boolean {
    if(email.length === 0 || email === ' ')
      return true;
    
    if(!email.includes('@'))
      return true;
    return false;
  }
  invalidPhoneNr(phoneNr: string) {
    if(phoneNr.length === 0) return true;
    let numbers = '1234567890'
    for(let ch of phoneNr)
      if(!numbers.includes(ch))
        return true;
    return false;
  }
  invalidFullName(fullName: string) {
    if(fullName.length === 0 || fullName === ' ')
      return true;
    let numbers = '0123456789'
    for(let ch of fullName){
      if(this.specialCharacters.includes(ch) || numbers.includes(ch))
        return true
    }
    return false;
  }
}
