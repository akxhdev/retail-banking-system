import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { Customer } from 'src/app/models/customer';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.css'],
})
export class TransferAmountComponent implements OnInit {
  @Input() customer: Customer | null = null;
  accounts: Account[] | null = null;
  selectedAccountId: string | null = null;

  message: string | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    if (this.customer == null) return;

    // set customer accounts
    this.accounts = this.customer.accounts;
  }

  public onSubmit(form: NgForm) {
    if (this.selectedAccountId == null) return;

    let targetAccount: string = form.value['targetAccount'];
    let amount: number = form.value['amount'];

    let transferInput = {
      sourceAccount: {
        accountId: this.selectedAccountId,
        amount: amount,
      },
      targetAccount: {
        accountId: targetAccount,
        amount: amount,
      },
      amount: amount,
      reference: 'transfer',
    };

    console.log(transferInput);

    this.accountService.transfer(transferInput).subscribe((reponse) => {
      this.message = reponse.message;
    });

    // form reset
    form.reset();
  }

  public onSelect(accountId: string) {
    this.selectedAccountId = accountId;
  }
}
