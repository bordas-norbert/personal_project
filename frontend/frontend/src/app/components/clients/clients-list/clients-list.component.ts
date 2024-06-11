import { ClientsService } from './../../../services/clients.service';
import { Component } from '@angular/core';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent {
  clients: Client[] = [];

  constructor(private clientsService: ClientsService) { }

 
  ngOnInit(): void {
    this.clientsService.getAllClients()
    .subscribe(
      {
        next: (clients) => {
        this.clients = clients;
      },
      error: (response) => {
        console.log(response);
      }
      }
    )
    
  }

}
