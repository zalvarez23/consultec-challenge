import { Injectable } from '@angular/core';
import { ClientRepository } from 'src/domain/repositories/client.repository';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from 'src/domain/models/client.model';
import { Observable, firstValueFrom, map, of } from 'rxjs';
import { ClientEntity } from './entities/client-repository.entity';
import { ClientImplementationRepositoryMapper } from './mappers/client-repository.mapper';

@Injectable({
  providedIn: 'root',
})
export class ClientImplementationRepository extends ClientRepository {
  userMapper = new ClientImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  getClients(): Observable<ClientModel[]> {
    const clientsData = localStorage.getItem('clients');
    const clients = clientsData ? JSON.parse(clientsData) : [];
    return of(clients);
  }

  saveClient(newClient: ClientModel): Observable<ClientModel> {
    newClient.isActive = true;
    const clientsData = localStorage.getItem('clients');
    let clients: ClientModel[] = clientsData ? JSON.parse(clientsData) : [];
    const lastId =
      clients.length > 0 ? Math.max(...clients.map((client) => client.id)) : 0;
    newClient.id = lastId + 1;
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
    return of(newClient);
  }

  deleteClient(id: number): Observable<ClientModel | undefined> {
    const clientsData = localStorage.getItem('clients');
    let clients: ClientModel[] = clientsData ? JSON.parse(clientsData) : [];

    // Encuentra el cliente por su ID
    const clientToDelete = clients.find((client) => client.id === id);

    if (clientToDelete) {
      // Cambia el estado isActive a false
      clientToDelete.isActive = false;

      // Actualiza la lista en el localStorage
      localStorage.setItem('clients', JSON.stringify(clients));
    }

    return of(clientToDelete);
  }

  async saveToLocalStorage() {
    const clients = await firstValueFrom(
      this.http.get<ClientEntity[]>('assets/clients.json')
    );
    const clientsData = JSON.stringify(clients);
    localStorage.setItem('clients', clientsData);
  }
}
