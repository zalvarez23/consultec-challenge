import { ClientModel } from 'src/domain/models/client.model';
import { ClientEntity } from '../entities/client-repository.entity';
import { Mapper } from 'src/base/mapper';

export class ClientImplementationRepositoryMapper extends Mapper<
  ClientEntity,
  ClientModel
> {
  mapFrom(param: ClientEntity): ClientModel {
    return {
      id: param.id,
      name: param.name,
      email: param.email,
      phone: param.phone,
      location: param.location || 0,
      isActive: param.isActive,
    };
  }

  mapTo(param: ClientModel): ClientEntity {
    return {
      id: param.id,
      name: param.name,
      email: param.email,
      phone: param.phone,
      location: param.location || 0,
      isActive: param.isActive,
    };
  }
}
