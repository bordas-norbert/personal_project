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
  
  credentials = ["testname","test"]
  
  constructor(private router: Router, private loginService: ClientsService) { }
  public isLoggedIn : boolean = this.loginService.isLoggedIn();
  loginClient()
  {
      this.loginService.loginClient(this.credentials).subscribe({
        next: (result) => {
          let currentClient: Client = result;
          console.log(currentClient);
          this.isLoggedIn = true;
          this.router.navigate(['login']);
        },
        error: err => {
          console.error(('client not found'));
          
        }
      })
    
  }

  logoutClient(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
