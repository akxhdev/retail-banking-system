import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-service-charge-deduction',
  templateUrl: './service-charge-deduction.component.html',
  styleUrls: ['./service-charge-deduction.component.css'],
})
export class ServiceChargeDeductionComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  public deductServiceCharge() {
    this.accountService.deductServiceCharge().subscribe((accounts) => {
      console.log(accounts);
    });
  }
}
