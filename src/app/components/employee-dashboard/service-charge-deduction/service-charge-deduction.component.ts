import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-service-charge-deduction',
  templateUrl: './service-charge-deduction.component.html',
  styleUrls: ['./service-charge-deduction.component.css'],
})
export class ServiceChargeDeductionComponent implements OnInit {
  isError: boolean = false;
  constructor(
    private accountService: AccountService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  public get isLoading(): boolean {
    return this.loadingService.isLoading;
  }

  public deductServiceCharge() {
    //start loading
    this.loadingService.startLoading();

    this.accountService.deductServiceCharge().subscribe({
      next: (accounts) => {
        console.log(accounts);

        // stop loading
        this.loadingService.stopLoading();
      },
      error: (error) => {
        this.isError = true;

        // stop loading
        this.loadingService.stopLoading();

        // reset flags
        this.resetFlags();
      },
    });
  }

  private resetFlags() {
    setTimeout(() => {
      this.isError = false;
    }, 2000);
  }
}
