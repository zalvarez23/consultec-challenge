import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';
import { ClientModel } from '../models/client.model';
import { UseCase } from 'src/base/use-case';

export class SaveClientsUseCase implements UseCase<ClientModel, ClientModel> {
  constructor(private clientRepository: ClientRepository) {}

  execute(clientModel: ClientModel): Observable<ClientModel> {
    return this.clientRepository.saveClient(clientModel);
  }
}
