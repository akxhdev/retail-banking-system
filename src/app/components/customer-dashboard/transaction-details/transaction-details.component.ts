import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit {
  @Input() customerId: string | null = null;

  customer: Customer | null = null;

  selectedAccountId: string | null = null;
  constructor(private customerService: CustomerService) {
    this.selectedAccountId = null;
  }

  ngOnInit(): void {
    if (this.customerId == null) return;

    this.getCustomer(this.customerId);
  }

  public onSelect(accountId: string) {
    this.selectedAccountId = accountId;

    console.log(this.customer);
  }

  public getTransactions() {
    if (this.customer == null) return;

    let selectedAccount = this.customer.accounts.filter(
      (account) => account.accountId === this.selectedAccountId
    )[0];

    return selectedAccount.transactions;
  }

  private getCustomer(customerId: string) {
    this.customerService.getCustomer(customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
      },
    });
  }
}
