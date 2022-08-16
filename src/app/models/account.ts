import { Transaction } from './transaction';

export class Account {
  constructor(
    public accountId: string,
    public customerId: string,
    public currentBalance: number,
    public accountType: string,
    public openingDate: Date,
    public ownerName: string,
    public transactions: Transaction[]
  ) {}
}
