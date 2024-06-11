import cli from '@angular/cli';
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
  constructor(private clientService: ClientsService, private router: Router){ 
  }
  addClient() {
    this.clientService.addClient(this.addClientRequest)
    .subscribe(
      {
        next: (client) => {
          this.router.navigate(['']); //register utan hva nyiljon meg a webpage
        }
      }
    )
  }
}
