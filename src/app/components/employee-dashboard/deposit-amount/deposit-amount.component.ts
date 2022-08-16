import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.component.html',
  styleUrls: ['./deposit-amount.component.css'],
})
export class DepositAmountComponent implements OnInit {
  isError: boolean = false;
  isSuccess: boolean = false;
  message: string | null = null;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    let accountId: string = form.value['accountId'];
    let amount: number = form.value['amount'];

    let accountInput = {
      accountId: accountId,
      amount: amount,
    };

    console.log(accountInput);

    this.accountService.deposit(accountInput).subscribe({
      next: (account) => {
        this.isSuccess = true;
        this.message = 'Deposit successfull.';
      },
      error: (error) => {
        this.isError = true;
        this.message = 'Unable to process your request';

        // reset flags
        this.resetFlags();
      },
    });

    // form reset
    form.reset();
  }

  private resetFlags() {
    setTimeout(() => {
      this.isError = false;
      this.isSuccess = false;
    }, 2000);
  }
}
