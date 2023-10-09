import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';
import { ClientModel } from '../models/client.model';
import { UseCase } from 'src/base/use-case';

export class GetClientsUseCase implements UseCase<null, ClientModel[]> {
  constructor(private clientRepository: ClientRepository) {}

  execute(): Observable<ClientModel[]> {
    return this.clientRepository.getClients();
  }
}
