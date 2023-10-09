import { Observable } from 'rxjs';
import { ClientModel } from '../models/client.model';

export abstract class ClientRepository {
  abstract getClients(): Observable<ClientModel[]>;
  abstract saveClient(client: ClientModel): Observable<ClientModel>;
  // abstract updateClient?(client: ClientModel): Observable<void>;
  abstract deleteClient(clientId: Number): Observable<ClientModel | undefined>;
}
