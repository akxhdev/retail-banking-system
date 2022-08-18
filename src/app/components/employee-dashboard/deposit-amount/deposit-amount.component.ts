import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account-service/account.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-deposit-amount',
  templateUrl: './deposit-amount.component.html',
  styleUrls: ['./deposit-amount.component.css'],
})
export class DepositAmountComponent implements OnInit {
  isError: boolean = false;
  isSuccess: boolean = false;
  message: string | null = null;
  constructor(
    private accountService: AccountService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  public get isLoading() {
    return this.loadingService.isLoading;
  }

  public onSubmit(form: NgForm) {
    // start loading
    this.loadingService.startLoading();

    let accountId: string = form.value['accountId'];
    let amount: number = form.value['amount'];

    let accountInput = {
      accountId: accountId,
      amount: amount,
    };

    console.log(accountInput);

    this.accountService.deposit(accountInput).subscribe({
      next: (account) => {
        // stop loading
        this.loadingService.stopLoading();

        this.isSuccess = true;
        this.message = 'Deposit successfull.';
      },
      error: (error) => {
        // stop loading
        this.loadingService.stopLoading();

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
      this.message = null;
    }, 2000);
  }
}
