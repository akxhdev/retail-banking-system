import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { AccountErrorResponse } from 'src/app/models/account_error_response';
import { Customer } from 'src/app/models/customer';
import { AccountService } from 'src/app/services/account-service/account.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-withdraw-amount',
  templateUrl: './withdraw-amount.component.html',
  styleUrls: ['./withdraw-amount.component.css'],
})
export class WithdrawAmountComponent implements OnInit {
  @Input() customer: Customer | null = null;

  isError: boolean = false;
  isSuccess: boolean = false;
  message: string | null = null;
  accounts: Account[] | null = null;

  selectedAccountId: string | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    if (this.customer == null) return;

    // set customer accounts
    this.accounts = this.customer.accounts;
  }

  public onSubmit(form: NgForm) {
    if (this.selectedAccountId == null) return;

    let amount: number = form.value['amount'];

    let accountInput = {
      accountId: this.selectedAccountId,
      amount: amount,
    };

    this.accountService.withdraw(accountInput).subscribe({
      next: (account) => {
        this.isSuccess = true;
        this.message = 'Amount withdrawn successfully.';

        // reset flags
        this.resetFlags();
      },
      error: (error: AccountErrorResponse) => {
        console.log(error);

        this.isError = true;
        this.message = 'Unable to process your request.';

        // reset flags
        this.resetFlags();
      },
    });

    // form reset
    form.reset();
  }

  public onSelect(accountId: string) {
    this.selectedAccountId = accountId;
  }

  private resetFlags() {
    setTimeout(() => {
      this.isError = false;
    }, 2000);
  }
}
