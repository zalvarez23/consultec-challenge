import { LocationModel } from './location';

export interface ClientModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  location?: LocationModel | number;
  idLocation?: number;
  isActive: boolean;
}
