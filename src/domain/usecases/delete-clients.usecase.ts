import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';
import { ClientModel } from '../models/client.model';
import { UseCase } from 'src/base/use-case';

export class DeleteClientsUseCase
  implements UseCase<number, ClientModel | undefined>
{
  constructor(private clientRepository: ClientRepository) {}

  execute(clientId: number): Observable<ClientModel | undefined> {
    return this.clientRepository.deleteClient(clientId);
  }
}
