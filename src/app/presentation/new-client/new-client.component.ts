import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/domain/models/client.model';
import { SaveClientsUseCase } from 'src/domain/usecases/save-clients.usecase';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
})
export class NewClientComponent {
  private saveClient = inject(SaveClientsUseCase);
  private router = inject(Router);
  constructor() {}

  onHandlerNewClient(newClient: ClientModel) {
    this.saveClient.execute(newClient).subscribe((res) => {
      this.router.navigate(['']);
    });
  }
}
