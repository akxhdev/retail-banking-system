import { Attribute, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CustomerService } from 'src/app/services/customer-service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  tabs = [
    'Customer Details',
    'Transaction Details',
    'Withdraw Amount',
    'Transfer Amount',
  ];

  selectedTab: number = 0;
  customerId: string;
  customer: Customer | null = null;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService
  ) {
    // get account id
    let accountId = (this.customerId = authService.getUserId());

    // get customer
    this.getCustomer();
  }

  ngOnInit(): void {}

  public changeTab(selected: number) {
    this.selectedTab = selected;

    // refersh data
    this.getCustomer();
  }

  public getCustomer() {
    // get customer
    this.customerService.getCustomer(this.customerId).subscribe((customer) => {
      this.customer = customer;
    });
  }
}
