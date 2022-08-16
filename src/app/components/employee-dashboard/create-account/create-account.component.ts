import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { AccountService } from 'src/app/services/account-service/account.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  // flags
  isFetchError: boolean = false;
  isAccountCreationError: boolean = false;
  isAccountCreationSuccess: boolean = false;

  message: string = '';

  customer: Customer | null = null;
  openingDate: Date = new Date();

  accountForm = new FormGroup({
    customerId: new FormControl(''),
    ownerName: new FormControl('akshay'),
  });

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {}

  public onSubmitCustomerForm(form: NgForm) {
    // get value
    let customerId = form.value['customerId'];

    // get customer details
    this.customerService.getCustomer(customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: (error) => {
        this.isFetchError = true;
        this.message = 'Unable to find ' + customerId;

        // reset flags
        this.resetFlags();
      },
    });

    // reset form
    form.reset();
  }

  public onSubmitAccountForm(form: NgForm) {
    if (this.customer == null) return;

    // get values
    let currentBalance = form.value['balance'];
    let accountType = form.value['accountType'];
    let openingDate = new Date();
    let ownerName = this.customer.name;

    // get customer id
    let customerId = this.customer.customerId;

    // create account
    let account = {
      customerId: customerId,
      currentBalance: currentBalance,
      accountType: accountType,
      openingDate: openingDate,
      ownerName: ownerName,
    };

    this.accountService.createAccount(customerId, account).subscribe({
      next: (status) => {
        this.isAccountCreationSuccess = true;
        this.message =
          'Account created successfully! Your account id is ' +
          status.accountId;

        this.resetFlags();
      },
      error: (error) => {
        this.isAccountCreationError = true;
        this.message = 'Unable to create your account';

        this.resetFlags();
      },
    });

    // reset form
    form.reset();
  }

  private resetFlags() {
    setTimeout(() => {
      this.isFetchError = false;
      this.isAccountCreationError = false;
      this.isAccountCreationSuccess = false;
      this.message = '';
    }, 2000);
  }
}
