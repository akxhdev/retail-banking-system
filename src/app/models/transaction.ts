export class Transaction {
  constructor(
    public id: string,
    public sourceAccountId: string,
    public sourceOwnerName: string,
    public targetAccountId: string,
    public targetOwnerName: string,
    public amount: number,
    public initiationDate: Date,
    public reference: string
  ) {}
}
