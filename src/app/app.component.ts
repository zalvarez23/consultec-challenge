import { Component, OnInit, inject } from '@angular/core';
import { ClientModel } from 'src/domain/models/client.model';
import { GetClientsUseCase } from 'src/domain/usecases/get-clients.usecase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private getClient = inject(GetClientsUseCase);
  title = 'client-management';
  displayedColumns: string[] = ['name', 'phone', 'email', 'location', 'status'];
  dataSource: ClientModel[];
  constructor() {
    this.dataSource = [];
  }

  getClients() {
    this.getClient.execute().subscribe((clients) => {
      this.dataSource = clients;
    });
  }

  ngOnInit(): void {
    this.getClients();
  }
}
