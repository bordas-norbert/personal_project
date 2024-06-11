import { ClientsService } from './../../../services/clients.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  constructor(private route: ActivatedRoute, private clientService: ClientsService, private router: Router) {}
  clientDetails: Client = {
    password: '',
    username: '',
    fullName: '',
    email: '',
    clientId: 0,
    phoneNumber: '',
    userRole: 'user'
  };
  ngOnInit() {
    this.route.paramMap.subscribe(
    {
      next: (params) => {
        const id = params.get('id');
        
        if(id) {
            this.clientService.getClient(id).subscribe({
              next: (response) => {
                  
                  this.clientDetails = response;
              }
            })
        }
      }
    }
    )
  }

  updateClient() {
    this.clientService.updateClient(this.clientDetails.clientId.toString(), this.clientDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['clients']);
        
      }
    })
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['clients']);
      }
    })
  }
}
