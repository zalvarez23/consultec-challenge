import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRepository } from 'src/domain/repositories/client.repository';
import { GetClientsUseCase } from 'src/domain/usecases/get-clients.usecase';
import { ClientImplementationRepository } from './repositories/client/client-implementation.repository';
import { HttpClientModule } from '@angular/common/http';
import { SaveClientsUseCase } from 'src/domain/usecases/save-clients.usecase';
import { DeleteClientsUseCase } from 'src/domain/usecases/delete-clients.usecase';

const clientUseCaseFactory = (clientRepo: ClientRepository) =>
  new GetClientsUseCase(clientRepo);

const saveClientUseCaseFactory = (clientRepo: ClientRepository) =>
  new SaveClientsUseCase(clientRepo);

const deleteClientUseCaseFactory = (clientRepo: ClientRepository) =>
  new DeleteClientsUseCase(clientRepo);

export const getClientUseCaseProvider = {
  provide: GetClientsUseCase,
  useFactory: clientUseCaseFactory,
  deps: [ClientRepository],
};

export const saveClientUseCaseProvider = {
  provide: SaveClientsUseCase,
  useFactory: saveClientUseCaseFactory,
  deps: [ClientRepository],
};

export const deleteClientUseCaseProvider = {
  provide: DeleteClientsUseCase,
  useFactory: deleteClientUseCaseFactory,
  deps: [ClientRepository],
};

export function loadData(dataService: ClientImplementationRepository) {
  return () => dataService.saveToLocalStorage();
}

@NgModule({
  providers: [
    HttpClientModule,
    getClientUseCaseProvider,
    saveClientUseCaseProvider,
    deleteClientUseCaseProvider,
    { provide: ClientRepository, useClass: ClientImplementationRepository },
    {
      provide: APP_INITIALIZER,
      useFactory: loadData,
      deps: [ClientImplementationRepository],
      multi: true,
    },
  ],
  declarations: [],
  imports: [CommonModule],
})
export class DataModule {}
