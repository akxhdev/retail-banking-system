import { Account } from './account';

export class Customer {
  constructor(
    public customerId: string,
    public name: string,
    public dateOfBirth: string,
    public pan: string,
    public address: string,
    public accounts: Account[]
  ) {}
}
