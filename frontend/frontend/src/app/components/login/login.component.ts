import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from 'src/app/models/client.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  credentials = ["",""]
  
  constructor(private router: Router, private loginService: ClientsService) { }
  public isLoggedIn : boolean = this.loginService.isLoggedIn();
  loginClient()
  {
    if(!this.validInputs(this.credentials))
    {
      alert("Invalid input")
      return;
    }
    this.loginService.loginClient(this.credentials).subscribe({
      next: (result) => {
        let currentClient: Client = result;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      },
      error: err => {
        alert('Client not found')
      }
    })
    
  }

  logoutClient(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
  validInputs(credentials: string[]): boolean {
    if(this.credentials[0].length === 0 || this.credentials[1].length === 0)
      return false;
    let specialCharacters = '[!@#$%^&*`-=+/\(),.?":{}|<>]'
    for(let ch of specialCharacters){
      if(credentials[0].includes(ch))
        return false;
    }
    return true;
  }
}
