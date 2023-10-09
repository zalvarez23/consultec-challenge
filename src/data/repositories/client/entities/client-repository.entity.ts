export interface ClientEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: Locationentity | number;
  isActive: boolean;
}

export interface Locationentity {
  id: number;
  name: string;
  address: string;
}
