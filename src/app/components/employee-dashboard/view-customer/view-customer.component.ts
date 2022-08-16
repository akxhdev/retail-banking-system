import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  isLoading: boolean = false;
  isFetchError: boolean = false;
  message: string = '';
  customer: Customer | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    this.customer = null;
    let customerId: string = form.value['customerId'];

    this.isLoading = true;
    this.getCustomer(customerId);
    this.isLoading = false;

    // reset form
    form.reset();
  }

  // fetch customer details
  public getCustomer(customerId: string) {
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
  }

  // reset flags
  private resetFlags() {
    setTimeout(() => {
      this.isFetchError = false;
    }, 2000);
  }
}
